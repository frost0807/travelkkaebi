package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import com.bitcamp.travelkkaebi.service.ReviewReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/review/reply")
public class ReviewReplyController {

    private final ReviewReplyService reviewReplyService;

    /**
     * 댓글 작성
     */
    @PostMapping("/write")
    public ResponseEntity replyWrite(@RequestBody ReviewReplyDTO reviewReplyDTO, @RequestBody ReviewDTO reviewDTO, @AuthenticationPrincipal int userId) {
        try {
            int replyId = reviewReplyService.writeReply(reviewReplyDTO, reviewDTO, userId);
            return new ResponseEntity(replyId, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 댓글 수정
     */
    @PutMapping("/update")
    private ResponseEntity replyUpdate(@RequestBody ReviewReplyDTO reviewReplyDTO, @AuthenticationPrincipal int userId) {
        try {
            int replyId = reviewReplyService.update(reviewReplyDTO, userId);
            return new ResponseEntity(replyId, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/delete")
    private ResponseEntity replyDelete(@RequestBody ReviewReplyDTO reply, @AuthenticationPrincipal int userId) {
        try {
            int replyId = reviewReplyService.delete(reply, userId);
            return new ResponseEntity(replyId, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
