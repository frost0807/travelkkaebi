package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ReviewReplyResponseDTO;
import com.bitcamp.travelkkaebi.exception.ErrorCode;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.mapper.ReviewReplyMapper;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewReplyService {
    private final ReviewReplyMapper replyMapper;

    /**
     * 댓글 작성
     *
     * @param reply
     * @param userId
     * @return
     */
    public boolean writeReply(ReviewReplyDTO reply, @AuthenticationPrincipal int userId) throws Exception {

        // 로그인 한 유저의 식별자 set
        reply.setUserId(userId);

        if (replyMapper.insert(reply) != 0) { // insert 성공 시
            return true;
        } else { // insert 실패
            throw new KkaebiException(ErrorCode.FAILED_TO_INSERT_BOARD);
        }

    }

    /**
     * 댓글 수정
     *
     * @param reply
     * @param userId
     * @return updatedReplyId
     */
    @Transactional
    public int update(ReviewReplyDTO reply, int userId) throws Exception {
        if (userId == reply.getUserId()) {
            reply.setComment(reply.getComment());
            return replyMapper.update(reply);

        } else {
            throw new KkaebiException(ErrorCode.DOES_NOT_MATCH_USER);
        }
    }


    /**
     * 댓글 삭제
     *
     * @param reviewReplyId
     * @param userId
     * @return deletedReplyId
     */
    @Transactional
    public int delete(int reviewReplyId, int userId) throws Exception {

        return replyMapper.delete(ReviewReplyDTO.builder()
                .ReviewReplyId(reviewReplyId)
                .userId(userId)
                .build());
    }

    /**
     * 댓글 조회
     *
     * @param boardId
     * @return list
     */
    public List<ReviewReplyResponseDTO> selectOne(int boardId) throws Exception {

        if (boardId != 0) {
            return replyMapper.selectAllByBoardId(boardId);

        } else {
            throw new KkaebiException(ErrorCode.DOES_NOT_EXIST_BOARD);
        }
    }
}