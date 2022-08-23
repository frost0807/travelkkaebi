package com.bitcamp.travelkkaebi.controller;
// 후기 게시판


import com.bitcamp.travelkkaebi.dto.LogInDTO;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.service.ReviewService;
import com.bitcamp.travelkkaebi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;
     private final UserService userService;

    // 후기 게시글 작성하는 메소드
    @PostMapping("/write")
    public void write(@RequestBody ReviewDTO reviewDTO, LogInDTO logInDTO) {
        System.out.println("컨트롤러");
        reviewService.writeReview(reviewDTO);
    }

    @PutMapping("/update")
    private void update(@RequestBody ReviewDTO reviewDTO) {
        reviewService.update(reviewDTO);
    }

    @DeleteMapping("/delete")
    private void delete(@RequestBody int reviewId) {
        reviewService.delete(reviewId);
    }

}
