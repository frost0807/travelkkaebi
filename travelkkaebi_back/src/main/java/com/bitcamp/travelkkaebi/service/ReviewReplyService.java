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
    private final ReviewReplyMapper replyMapper;

    /**
     * 댓글 작성
     * @param reply
     * @param review
     * @param userId
     * @return
     */
    public int writeReply(ReviewReplyDTO reply, ReviewDTO review, @AuthenticationPrincipal int userId) {
        int writtenReplyId;

        try {
            reply.setBoardId(review.getReviewId());
            reply.setCategoryId(review.getCategoryId());
            reply.setUserId(userId);
            reply.setComment(reply.getComment());

            // 댓글 등록 성공 시
            writtenReplyId = replyMapper.insert(reply);

        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }

        return writtenReplyId;
    }

    /**
     * 댓글 수정
     * @param reply
     * @param userId
     * @return updatedReplyId
     */
    public int update(ReviewReplyDTO reply, int userId) {
        int updatedReplyId;

        if (userId == reply.getUserId()) {
            try {
                reply.setComment(reply.getComment());
                updatedReplyId = replyMapper.update(reply);

            } catch (Exception e) {
                e.printStackTrace();
                return 0;
            }
        } else {
            return 0;
        }
        return updatedReplyId;
    }

    /**
     * 댓글 삭제
     * @param reply
     * @param userId
     * @return deletedReplyId
     */
    public int delete(ReviewReplyDTO reply, int userId) {
        int deletedReplyId;

        if(userId == reply.getUserId()) {
            try {
                deletedReplyId = replyMapper.delete(reply.getReviewReplyId());
            } catch (Exception e) {
                e.printStackTrace();
                return 0;
            }
        } else {
            return 0;
        }

        return deletedReplyId;
    }

    /**
     * 댓글 조회
     * @param boardId
     * @return list
     */
    public List<ReviewReplyDTO> selectOne(int boardId) {
        List<ReviewReplyDTO> list;

        if(boardId != 0) {
            try {
                list = replyMapper.selectAllByBoardId(boardId);

            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        } else {
            return null;
        }

        return list;
    }
}