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

    /**
     * 게시글 작성
     */
    @PostMapping("/write")
    public ResponseEntity write(@RequestBody ReviewDTO reviewDTO) {
        try {
            int reviewId = reviewService.writeReview(reviewDTO, 1);
            return new ResponseEntity(reviewId, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 게시글 수정
     */
    @PutMapping("/update")
    private ResponseEntity update(@RequestBody ReviewDTO reviewDTO) {
        try {
            int updatedId = reviewService.update(reviewDTO, 1);
            return new ResponseEntity(updatedId, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/delete")
    private ResponseEntity delete(@RequestBody ReviewDTO review) {
        System.out.println("게시글 삭제 컨트롤러 도착");
        try {
            int deletedId = reviewService.delete(review, 1);

            return new ResponseEntity(deletedId, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 게시글 리스트 출력
     */
    @GetMapping("/selectAllByPage")
    private List<ReviewDTO> selectAll() {
        System.out.println("컨트롤러 들어왔어요");
       try {
            List<ReviewDTO> reviewList = reviewService.selectAllByPage(1);
           // return new ResponseEntity(reviewList, HttpStatus.OK);
           return reviewList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 게시글 상세보기
     */
    @GetMapping("/selectOne")
    private ResponseEntity selectOne(@RequestBody ReviewDTO reviewDTO) {
        ReviewDTO review;
        System.out.println("게시물 상세보기 컨트롤러 도착");

        try {
            review = reviewService.selectOne(reviewDTO);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return new ResponseEntity(review, HttpStatus.OK);
    }









}