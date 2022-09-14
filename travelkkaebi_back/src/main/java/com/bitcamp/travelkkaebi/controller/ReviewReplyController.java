package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.ReviewReplyResponseDTO;
import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import com.bitcamp.travelkkaebi.service.ReviewReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/review/reply")
public class ReviewReplyController {

    private final ReviewReplyService reviewReplyService;

    /**
     * 댓글 작성
     */
    @PostMapping("/write")
    public ResponseEntity<Boolean> replyWrite(@RequestBody ReviewReplyDTO reviewReplyDTO,
                                              @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(reviewReplyService.writeReply(reviewReplyDTO,
                    Integer.parseInt(userId)), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 댓글 수정
     */
    @PutMapping("/update")
    private ResponseEntity replyUpdate(@RequestBody ReviewReplyDTO reviewReplyDTO, @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(reviewReplyService.update(reviewReplyDTO,
                    Integer.parseInt(userId)), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/delete")
    private ResponseEntity<Integer> replyDelete(@RequestParam int reviewReplyId, @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(reviewReplyService.delete(reviewReplyId,
                    Integer.parseInt(userId)), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 댓글 조회 (특정 게시물에 달린)
     */
    @GetMapping("/selectbyreview")
    private ResponseEntity<List<ReviewReplyResponseDTO>> selectByReview(@RequestParam int reviewId) {

        try {
            return new ResponseEntity<>(reviewReplyService.selectOne(reviewId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


}
