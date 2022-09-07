package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ReviewResponseDTO;
import com.bitcamp.travelkkaebi.mapper.ReviewMapper;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewMapper reviewMapper;

    private final int PAGE_SIZE = 10;

    /**
     * 게시글 등록
     * @param reviewDTO
     * @param userId
     * @return writtenReviewId
     */
    public ReviewResponseDTO writeReview(ReviewDTO reviewDTO, int userId) throws Exception {
        reviewDTO.setUserId(userId);

        if(reviewMapper.insert(reviewDTO) != 0) { // insert 성공 시
            // userGenerateKeys에 의해 생성된 Id값으로 selectOne 해서 리턴
            return reviewMapper.selectOne(reviewDTO.getReviewId())
                    .orElseThrow(() -> new NullPointerException("입력한 게시물이 존재하지 않습니다."));
        } else { // insert 실패 시
            throw new RuntimeException("게시물이 등록되지 않았습니다.");
        }
    }

    /**
     * 게시글 수정
     * @param review
     * @param userId
     * @return updatedReviewId
     */
    @Transactional
    public ReviewResponseDTO update(ReviewDTO review, int userId) throws Exception {

        // 로그인 한 유저가 글의 작성자인지 확인
        if (userId == review.getUserId()) {
            if (reviewMapper.update(review) != 0) {
                return selectOne(review.getReviewId());
            } else {
                throw new RuntimeException("게시물 수정 실패");
            }
        } else {
            throw new RuntimeException("작성자가 아닙니다.");
        }
    }

    /**
     * 게시글 삭제
     * @param review
     * @param userId
     * @return deletedReviewId;
     */
    @Transactional
    public int delete(ReviewDTO review, int userId) throws Exception {
        // 로그인 한 아이디와 게시글의 작성자 아이디를 확인!
        if (review.getUserId() == userId) {
            return reviewMapper.delete(review.getReviewId());
        } else {
            throw new RuntimeException("작성자가 아닙니다.");
        }
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
     * 게시글 상세보기
     * @param reviewId
     * @return review
     */

    public ReviewResponseDTO selectOne(int reviewId) throws Exception {
        // 조회수 +1 시켜주는 코드
        if(reviewMapper.viewPlus(reviewId) != 0)  {
            return reviewMapper.selectOne(reviewId)
                    .orElseThrow(() -> new NullPointerException("선택한 게시물이 존재하지 않습니다."));
        } else {
            throw new RuntimeException("게시물 조회수 갱신 실패");
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
     * @param title
     * @return titleList
     * @throws Exception
     */
    public List<ReviewResponseDTO> searchByTitle(String title, int pageNo) throws Exception {
        if (title != null) {
            return reviewMapper.searchByTitle(title);
        } else {
            return null;
        }
    }

    /**
     * 특정 내용으로 검색
     * @param content
     * @return contentList
     * @throws Exception
     */
    public List<ReviewResponseDTO> searchByContent(String content) throws Exception {

        if (content != null) {
            return reviewMapper.searchByContent(content);
        } else {
            return null;
        }
    }

    /**
     * 특정 작성자로 검색
     * @param writer
     * @return writerList
     * @throws Exception
     */

    public List<ReviewResponseDTO> searchByWriter(String writer) throws Exception {

        if(writer != null) {
            return reviewMapper.searchByWriter(writer);
        } else {
            return null;
        }
    }

    /**
     * (지역) 키워드로 검색
     * @param region
     * @return
     * @throws Exception
     */

    public List<ReviewResponseDTO> keywordByRegion(String region) throws Exception {

        if(region != null) {
            return reviewMapper.keywordByRegion(region);
        } else {
            return null;
        }
    }
}