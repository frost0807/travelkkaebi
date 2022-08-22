package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.repository.ReviewRepository;
import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final LikeOrDislikeService likeOrDislikeService;

    // ??



    // 후기 게시판에 글 등록하는 메소드
    public int writeReview(ReviewDTO review) {
        System.out.println("서비스");
        LikeOrDislikeDTO likeOrDislikeDTO = new LikeOrDislikeDTO();
        int writtenReviewId;
        int likeOrDislikeId;

        try {
            review.setCategoryId(review.getCategoryId());
            // logIn.getId 가 맞는지 헷갈림,,
//            review.setWriterId(logIn.getId());
            review.setTitle(review.getTitle());
            review.setContent(review.getContent());
            review.setRegion(review.getRegion());

            reviewRepository.insert(review);

            //성공!
            //categoryId, boardId, writerId

            // 좋아요 상태 추가
            likeOrDislikeDTO.setCategoryId(review.getCategoryId());
            likeOrDislikeDTO.setBoardId(review.getReviewId());
//            likeOrDislikeDTO.setUserId(logIn.getId());

            likeOrDislikeService.createLikeOrDislike(likeOrDislikeDTO);

            // 게시글 등록 성공 !
            writtenReviewId = reviewRepository.insert(review);
        } catch(Exception e)

    {
        e.printStackTrace();
        return 0;
    }

    // 성공했을 경우 writtenReviewId 리턴, 실패했을 경우 0 리턴
//        return writtenReviewId;
        return 0;
}

    // 후기 수정
    public int update(ReviewDTO review) {
        int updatedReviewId;

        try {
            review.setTitle(review.getTitle());
            review.setContent(review.getContent());
            review.setRegion(review.getRegion());

            updatedReviewId = reviewRepository.update(review);

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        // 성공했을 경우 updatedReviewid 리턴, 실패 시 0 리턴
        return updatedReviewId;
    }


    // 후기 삭제
    public int delete(int reviewId) {
        int deletedReviewId;

        try {
            deletedReviewId = reviewRepository.delete(reviewId);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        // 성공했을 경우 deletedReviewId 리턴, 실패 시 0 리턴
        return deletedReviewId;
    }


}
