package com.bitcamp.travelkkaebi.controller;
// 후기 게시판


import com.bitcamp.travelkkaebi.dto.LogInDTO;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import com.bitcamp.travelkkaebi.service.LikeOrDislikeService;
import com.bitcamp.travelkkaebi.service.ReviewReplyService;
import com.bitcamp.travelkkaebi.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.rmi.server.ExportException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // GET -> RequestParam
    // POST -> RequestBody

    /**
     * 게시글 작성 Ok
     */
    @PostMapping("/write")
    public ResponseEntity write(@RequestBody ReviewDTO reviewDTO, String userId) {
        try {
            int reviewId = reviewService.writeReview(reviewDTO, Integer.parseInt("1"));
            return new ResponseEntity(reviewId, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 게시글 수정 Ok
     */
    @PutMapping("/update")
    private ResponseEntity update(@RequestBody ReviewDTO reviewDTO, @AuthenticationPrincipal String userId) {
        try {
            int updatedId = reviewService.update(reviewDTO, Integer.parseInt(userId));
            return new ResponseEntity(updatedId, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 게시글 삭제 OK
     */
    @DeleteMapping("/delete")
    private ResponseEntity delete(@RequestBody ReviewDTO review) {
        System.out.println("게시글 삭제 컨트롤러 도착");
        try {
            int deletedId = reviewService.delete(review);
            return new ResponseEntity(deletedId, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 게시글 리스트 출력
     */
    @GetMapping("/selectallbypage")
    private ResponseEntity selectAll() {
        List<ReviewDTO> reviewList;
        System.out.println("게시글 리스트 컨트롤러 들어왔어요");

       try {
            reviewList = reviewService.selectAllByPage(1);
       } catch (Exception e) {
            e.printStackTrace();
            return null;
       }
       return new ResponseEntity(reviewList, HttpStatus.OK);
    }

    /**
     * 게시글 상세보기
     */
    @GetMapping("/selectone")
    private ResponseEntity selectOne(@RequestParam int reviewId) {
        ReviewDTO review;
        System.out.println("게시물 상세보기 컨트롤러 도착");

        try {
            review = reviewService.selectOne(reviewId);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return new ResponseEntity(review, HttpStatus.OK);
    }








}