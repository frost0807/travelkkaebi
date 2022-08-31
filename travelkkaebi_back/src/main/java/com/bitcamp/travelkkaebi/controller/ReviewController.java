package com.bitcamp.travelkkaebi.controller;
// 후기 게시판


import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            int reviewId = reviewService.writeReview(reviewDTO, Integer.parseInt(userId));
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
    private ResponseEntity selectAll(@RequestParam int pageNo) {
        List<ReviewDTO> reviewList;
        System.out.println("게시글 리스트 컨트롤러 들어왔어요");

        try {
            reviewList = reviewService.selectAllByPage(pageNo);
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

    /**
     * 게시물 좋아요 Up
     */
    @GetMapping("/likeup")
    private ResponseEntity likeUp(@RequestParam int reviewId) {
        int likedId;
        System.out.println("게시물 좋아요 Up 컨트롤러 도착");

        try {
            likedId = reviewService.likeUp(reviewId);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return new ResponseEntity(likedId, HttpStatus.OK);
    }

    /**
     * 게시물 좋아요 Down
     */
    @GetMapping("/likedown")
    private ResponseEntity likeDown(@RequestParam int reviewId) {
        int likedId;
        System.out.println("게시물 좋아요 DOWN 컨트롤러 도착");

        try {
            likedId = reviewService.likeDown(reviewId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return new ResponseEntity(likedId, HttpStatus.OK);
    }

    /**
     * 게시물 싫어요 UP
     */
    @GetMapping("/dislikeup")
    private ResponseEntity dislikeUp(@RequestParam int reviewId) {
        int likedId;
        System.out.println("게시물 싫어요 UP 컨트롤러 도착");

        try {
            likedId = reviewService.dislikeUp(reviewId);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return new ResponseEntity(likedId, HttpStatus.OK);
    }

    /**
     * 게시물 싫어요 DOWN
     */
    @GetMapping("/dislikedown")
    private ResponseEntity dislikeDown(@RequestParam int reviewId) {
        int likedId;
        System.out.println("게시물 싫어요 DOWN 컨트롤러 도착");

        try {
            likedId = reviewService.dislikeDown(reviewId);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return new ResponseEntity(likedId, HttpStatus.OK);
    }

    /**
     * 게시물 갯수 반환
     */
    @GetMapping("count")
    private ResponseEntity count() {
        int reviewCount;
        try {
            reviewCount = reviewService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return new ResponseEntity(reviewCount, HttpStatus.OK);
    }

}