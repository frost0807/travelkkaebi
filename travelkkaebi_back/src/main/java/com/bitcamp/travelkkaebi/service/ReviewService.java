package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.ReviewMapper;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.mapper.ReviewReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
     * @param review
     * @param userId
     * @return writtenReviewId
     */
    public int writeReview(ReviewDTO review, int userId) {

        int writtenId;

        try {
            review.setUserId(userId);
            writtenId = reviewMapper.insert(review);

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        return writtenId;
    }

    /**
     * 게시글 수정
     * @param review
     * @param userId
     * @return updatedReviewId
     */
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
    public int delete(ReviewDTO review, int userId) {
        System.out.println("게시글 삭제 서비스 도착");

        int deletedReviewId;
        // 로그인 한 아이디와 게시글의 작성자 아이디를 확인!
        if (userId == review.getUserId()) {
            try {
                deletedReviewId = reviewMapper.delete(review.getReviewId());

                // 해당 게시글에 달린 댓글 삭제
                //replyMapper.deletedByBoardId(review.getReviewId());
            } catch (Exception e) {
                e.printStackTrace();
                return 0;
            }
        } else {
            return 0;
        }
        // 성공했을 경우 deletedReviewId 리턴, 실패 시 0 리턴
        return deletedReviewId;
    }

    /**
     * 게시글 리스트 출력
     */
    public List<ReviewDTO> selectAllByPage(int pageNo) {
        System.out.println("서비스 들어왔어요!");
        List<ReviewDTO> list;

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

        // 작성자 닉네임 보여주기 위한 코드는
        // userService에서 가져오려고 지금은 임시로 식별자(writerId)를 보여줄 예정
        //HashMap<Integer, String> nicknameMap = new HashMap<>();

        return list;
    }

    /**
     * 게시글 상세보기
     * @param reviewId
     * @return review
     */
    public ReviewDTO selectOne(ReviewDTO reviewDTO) {
        System.out.println("상세보기 서비스 도착");
        // 조회수 +1 시켜주는 코드
        reviewMapper.viewPlus(reviewDTO.getReviewId());

        return reviewMapper.selectOne(reviewDTO.getReviewId());
    }
}