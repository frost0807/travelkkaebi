package com.bitcamp.travelkkaebi.controller;
// 후기 게시판


import com.bitcamp.travelkkaebi.dto.ReviewResponseDTO;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.service.ReviewService;
import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    /**
     * 게시글 작성 Ok
     */
    @PostMapping("/write")
    public ResponseEntity<Boolean> write(@RequestPart(value = "review") ReviewDTO reviewDTO,
                                         @RequestPart(value = "file", required = false) MultipartFile image,
                                         @AuthenticationPrincipal String userId) throws IOException {
        try {
            return new ResponseEntity(reviewService.writeReview(reviewDTO, image,
                    Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 게시글 수정 Ok
     */
    @PutMapping("/update")
    private ResponseEntity<Integer> update(
            @RequestPart(value = "review") ReviewDTO reviewDTO,
            @RequestPart(value = "file", required = false) MultipartFile image,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity(reviewService.update(reviewDTO, image, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 게시글 삭제 OK
     */
    @DeleteMapping("/delete")
    private ResponseEntity<Integer> delete(@RequestBody ReviewDTO review, @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity(reviewService.delete(review, Integer.parseInt(userId)), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 게시글 리스트 출력
     */
    @GetMapping("/selectallbypage")
    private ResponseEntity<List<ReviewResponseDTO>> selectAll(@RequestParam int pageNo) {

        try {
            return new ResponseEntity(reviewService.selectAllByPage(pageNo), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 게시글 상세보기
     */
    @GetMapping("/selectone")
    private ResponseEntity<ReviewResponseDTO> selectOne(@RequestParam int reviewId) {

        try {
            return new ResponseEntity(reviewService.selectOne(reviewId), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 게시물 갯수 반환
     */
    @GetMapping("/count")
    private ResponseEntity<Integer> count() {
        try {
            return new ResponseEntity(reviewService.count(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 특정 제목으로 검색
     */
    @GetMapping("/selectallbypage/searchbytitle")
    private ResponseEntity<ReviewResponseDTO> searchByTitle(@RequestParam("title") String word, int pageNo) {

        try {
            return new ResponseEntity(reviewService.searchByTitle(word, pageNo), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }

    }

    /**
     * 특정 내용으로 검색
     */
    @GetMapping("/selectallbypage/searchbycontent")
    private ResponseEntity<ReviewResponseDTO> searchByContent(@RequestParam("content") String word, int pageNo) {

        try {
            return new ResponseEntity(reviewService.searchByContent(word, pageNo), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }

    }

    /**
     * 특정 작성자로 검색
     */
    @GetMapping("/selectallbypage/searchbywriter")
    private ResponseEntity<ReviewResponseDTO> searchByWriter(@RequestParam("writer") String word, int pageNo) {
        try {
            return new ResponseEntity(reviewService.searchByWriter(word, pageNo), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }

    }

    /**
     * (지역) 키워드로 검색
     */
    @GetMapping("/selectallbypage/keywordbyregion")
    private ResponseEntity<ReviewResponseDTO> keywordByRegion(@RequestParam("region") String word, int pageNo) {

        try {
            return new ResponseEntity(reviewService.keywordByRegion(word, pageNo), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

}