package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.PageAndWordDTO;
import com.bitcamp.travelkkaebi.dto.ReviewResponseDTO;
import com.bitcamp.travelkkaebi.exception.ErrorCode;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.mapper.ReviewMapper;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static com.bitcamp.travelkkaebi.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewMapper reviewMapper;
    private final AwsS3service awsS3service;

    private final int PAGE_SIZE = 10;

    /**
     * 게시글 등록
     * @param reviewDTO
     * @param userId
     * @return writtenReviewId
     */
    public boolean writeReview(ReviewDTO reviewDTO, MultipartFile image, int userId) throws Exception {

        // 로그인 한 유저의 식별자 set
        reviewDTO.setUserId(userId);

        if (image != null) {
            reviewDTO.setReviewImgUrl(awsS3service.upload(image, "static"));

            if (reviewMapper.insert(reviewDTO) != 0) { // insert 성공 시
                return true;
            } else { // insert 실패 시
                throw new KkaebiException(FAILED_TO_INSERT_BOARD);
            }
        } else {
            reviewDTO.setReviewImgUrl(" ");
            if(reviewMapper.insert(reviewDTO) != 0) { // insert 성공 시
                return true;
            } else { // insert 실패 시
                throw new KkaebiException(FAILED_TO_INSERT_BOARD);
            }
        }

    }

    /**
     * 게시글 수정
     * @param review
     * @param userId
     * @return updatedReviewId
     */
    @Transactional
    public ReviewResponseDTO update(ReviewDTO review, MultipartFile image, int userId) throws Exception {
        System.out.println(userId);
        System.out.println(review.getUserId());
        // 로그인 한 유저가 글의 작성자인지 확인
        if (userId == review.getUserId()) {
            if (image != null) {
                review.setReviewImgUrl(awsS3service.upload(image, "static"));
                if (reviewMapper.update(review) != 0) {
                    return reviewMapper.selectOne(review.getReviewId())
                            .orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));
                }
            } else {
                review.setReviewImgUrl(" ");
                    if (reviewMapper.update(review) != 0) {
                        return reviewMapper.selectOne(review.getReviewId())
                                .orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));
                    }
                }
        } else {
            throw new KkaebiException(DOES_NOT_MATCH_USER);
        }

        return null;
    }

    /**
     * 게시글 삭제
     * @param review
     * @param userId
     * @return deletedReviewId
     */
    @Transactional
    public int delete(int reviewId, int userId) throws Exception {
        // 로그인 한 아이디와 게시글의 작성자 아이디를 확인!
            return reviewMapper.delete(ReviewDTO.builder()
                    .reviewId(reviewId)
                    .userId(userId)
                    .build());
    }

    /**
     * 게시글 리스트 출력
     */
    public List<ReviewResponseDTO> selectAllByPage(int pageNo) throws Exception {

        if (pageNo <= pageCount()) {
            HashMap<String, Integer> pageMap = new HashMap<>();
            int startNum = (pageNo - 1) * PAGE_SIZE;

            pageMap.put("startNum", startNum);
            pageMap.put("PAGE_SIZE", PAGE_SIZE);

            return reviewMapper.selectAllByPage(pageMap);
        } else {
            throw new RuntimeException("요청한 페이지의 크기가 게시글 리스트보다 많습니다.");
        }
    }

    /**
     * 메인 게시글 리스트 (추천)
     */
    public List<ReviewResponseDTO> selectAllGood(List<Integer> boardIdList) throws Exception {
        List<ReviewResponseDTO> goodList = new ArrayList<>();

        for(int i : boardIdList) {
            goodList.add(reviewMapper.selectOne(i)
                    .orElseThrow( ()-> new KkaebiException(DOES_NOT_EXIST_BOARD)));
        }

        return goodList;
    }

    /**
     * 메인 게시글 리스트 (신규)
     */
    public List<ReviewResponseDTO> selectAllForMain() throws Exception {
        return reviewMapper.selectAllForMain();
    }

    /**
     * 게시글 상세보기
     * @param reviewId
     * @return review
     */
    public ReviewResponseDTO selectOne(int reviewId) throws Exception {

        // 조회수 +1 시켜주는 코드
        if(reviewMapper.viewPlus(reviewId) != 0) {
            return reviewMapper.selectOne(reviewId)
                    .orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));
        } else {
            throw new KkaebiException(FAILED_TO_UPDATE_VIEW);
        }
    }

    /**
     * 전체 게시글 갯수 리턴
     */
    public int count() throws Exception {
        return reviewMapper.reviewCount();
    }

    /**
     * selectAll (전체보기) 할 때 페이지 수 리턴
     */
    public int pageCount() throws Exception {
        int total = count();

        if(total % PAGE_SIZE == 0) {
            return total / PAGE_SIZE;
        } else {
            return (total / PAGE_SIZE) + 1;
        }
    }

    /**
     * 특정 제목으로 검색
     * @param word (= title)
     * @return titleList
     * @throws Exception
     */
    public ListResponseDTO searchByTitle(String word, int pageNo) throws Exception {
        List<ReviewResponseDTO> list = reviewMapper.searchByTitle(setPageAndWord(pageNo, word));
        return setListResponse(reviewMapper.countByTitle(word), list);
    }

    /**
     * 특정 내용으로 검색
     * @param word (= content)
     * @return contentList
     * @throws Exception
     */
    public ListResponseDTO searchByContent(String word, int pageNo) throws Exception {
        List<ReviewResponseDTO> list = reviewMapper.searchByContent(setPageAndWord(pageNo, word));
        return setListResponse(reviewMapper.countByContent(word), list);
    }

    /**
     * 특정 작성자로 검색
     * @param word (= writer)
     * @return writerList
     * @throws Exception
     */

    public ListResponseDTO searchByWriter(String word, int pageNo) throws Exception {
        List<ReviewResponseDTO> list = reviewMapper.searchByWriter(setPageAndWord(pageNo, word));
        return setListResponse(reviewMapper.countByWriter(word), list);
    }

    /**
     * (지역) 키워드로 검색
     * @param word (= region)
     * @return
     * @throws Exception
     */

    public ListResponseDTO keywordByRegion(String word, int pageNo) throws Exception {
        List<ReviewResponseDTO> list = reviewMapper.keywordByRegion(setPageAndWord(pageNo, word));
        return setListResponse(reviewMapper.countByRegion(word), list);
    }

    /**
     * 페이지 번호 및 키워드 세팅
     */
    public PageAndWordDTO setPageAndWord(int pageNo, String word) {
        return PageAndWordDTO.builder()
                .startNum((pageNo - 1) * PAGE_SIZE)
                .pageSize(PAGE_SIZE)
                .word(word)
                .build();
    }

    /**
     * 검색 및 키워드 게시물 리스트와 총 페이지수 세팅
     */
    public ListResponseDTO setListResponse(int totalPageCount, List<ReviewResponseDTO> list) {
        return ListResponseDTO.builder()
                .totalBoardCount(totalPageCount)
                .list(list)
                .build();
    }

}