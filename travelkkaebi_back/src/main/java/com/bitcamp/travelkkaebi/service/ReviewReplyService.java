package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.ReviewReplyMapper;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewReplyService {
    private final ReviewReplyMapper reviewReplyMapper;

    // 후기 등록하는 메소드
    public int writeReply(ReviewReplyDTO reply, ReviewDTO review, @AuthenticationPrincipal int userId) {

        int writtenReplyId;

        try {
            reply.setBoardId(review.getReviewId());
            reply.setCategoryId(review.getCategoryId());
            reply.setWriterId(userId);
            reply.setComment(reply.getComment());

            reviewReplyMapper.insert(reply);

            // 댓글 등록 성공 시
            writtenReplyId = reviewReplyMapper.insert(reply);

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        return writtenReplyId;
    }

    // 후기 수정하는 메소드
    public int update(ReviewReplyDTO reply) {
        int updatedReplyId;

        try {
            reply.setComment(reply.getComment());
            updatedReplyId = reviewReplyMapper.update(reply);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        return updatedReplyId;
    }

    // 후기 삭제하는 메소드
    public int delete(int replyId) {
        int deletedReplyId;

        try {
            deletedReplyId = reviewReplyMapper.delete();

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        return deletedReplyId;
    }

    // 후기 댓글 보여주는 메소드
    public List<ReviewReplyDTO> selectOne(int reviewId) {

        List<ReviewReplyDTO> list = reviewReplyMapper.selectOne(reviewId);

        return list;
    }

}