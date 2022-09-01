package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ReviewResponseDTO;
import com.bitcamp.travelkkaebi.mapper.ReviewMapper;
import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.mapper.ReviewReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewMapper reviewMapper;
    private final ReviewReplyMapper replyMapper;
    private final LikeOrDislikeService likeOrDislikeService;

    private final int PAGE_SIZE = 10;

    /**
     * 게시글 등록
     * @param reviewDTO
     * @param userId
     * @return writtenReviewId
     */
    public int writeReview(ReviewDTO reviewDTO, int userId) {

        int writtenId;

        try {
            reviewDTO.setUserId(userId);
            writtenId = reviewMapper.insert(reviewDTO);

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
        return writtenId;
    }

    /**
     * 게시글 수정><
     * @param review
     * @param userId
     * @return updatedReviewId
     */
    @Transactional
    public int update(ReviewDTO review, int userId) {
        int updatedReviewId;

        if (userId == review.getUserId()) {
            try {
                updatedReviewId = reviewMapper.update(review);
            } catch (Exception e) {
                e.printStackTrace();
                return 0;
            }

        } else {
            return 0;
        }
        // 성공했을 경우 updatedReviewid 리턴, 실패 시 0 리턴
        return updatedReviewId;
    }

    /**
     * 게시글 삭제
     * @param review
     * @param userId
     * @return deletedReviewId;
     */
    @Transactional
    public int delete(ReviewDTO review, int userId) {
        System.out.println("게시글 삭제 서비스 도착");
        System.out.println(review.getReviewId());

        int deletedReviewId;
        // 로그인 한 아이디와 게시글의 작성자 아이디를 확인!
        if (review.getUserId() == userId) {
            try {
                deletedReviewId = reviewMapper.delete(review.getReviewId());

                // 해당 게시글에 달린 댓글 삭제
                //replyMapper.deletedByBoardId(review.getReviewId());
            } catch (Exception e) {
                e.printStackTrace();
                return 0;
            }
        } else {
            System.out.println("작성자와 다름");
            return -1;
        }
        // 성공했을 경우 deletedReviewId 리턴, 실패 시 0 리턴
        return deletedReviewId;
    }

    /**
     * 게시글 리스트 출력
     */
    public List<ReviewResponseDTO> selectAllByPage(int pageNo) {
        System.out.println("게시글 리스트 서비스 들어왔어요!");
        List<ReviewResponseDTO> list;

        try {
            HashMap<String, Integer> pageMap = new HashMap<>();
            int startNum = (pageNo - 1) * PAGE_SIZE;

            pageMap.put("startNum", startNum);
            pageMap.put("PAGE_SIZE", PAGE_SIZE);

            list = reviewMapper.selectAllByPage(pageMap);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return list;
    }

    /**
     * 게시글 상세보기
     * @param reviewId
     * @return review
     */
    public ReviewResponseDTO selectOne(int reviewId) {
        LikeOrDislikeDTO likeOrDislike = null;
        System.out.println("상세보기 서비스 도착");

        // 조회수 +1 시켜주는 코드
        reviewMapper.viewPlus(reviewId);
        ReviewResponseDTO review = reviewMapper.selectOne(reviewId);

        // 좋아요, 싫어요 갯수 업데이트
        likeOrDislike.setCategoryId(review.getCategoryId());
        likeOrDislike.setBoardId(review.getReviewId());
        HashMap<String, Integer> countMap = likeOrDislikeService.getCount(likeOrDislike);

        review.setLikeCount(countMap.get("like"));
        review.setDislikeCount(countMap.get("dislike"));

        return review;
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
        int total = reviewMapper.reviewCount();

        if(total % PAGE_SIZE == 0) {
            return total / PAGE_SIZE;
        } else {
            return (total / PAGE_SIZE) + 1;
        }
    }

    /*
    public List<ReviewDTO> searchByTitle(String title) {
        String searchTitle = reviewMapper.

    } */













}