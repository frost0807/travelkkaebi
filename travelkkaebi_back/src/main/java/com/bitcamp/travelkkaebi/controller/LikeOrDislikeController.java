package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.LikeOrDislikeResponseDTO;
import com.bitcamp.travelkkaebi.service.LikeOrDislikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likeordislike")
@RequiredArgsConstructor
public class LikeOrDislikeController {
    private final LikeOrDislikeService likeOrDislikeService;

    @GetMapping("/selectone")
    public ResponseEntity<LikeOrDislikeResponseDTO> selectOne(
            @RequestParam int categoryId,
            @RequestParam int boardId,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(likeOrDislikeService.selectOne(categoryId, boardId,
                    Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/clicklike")
    public ResponseEntity<LikeOrDislikeResponseDTO> clickLike(
            @RequestParam int likeOrDislikeId,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(likeOrDislikeService.clickLike(
                    likeOrDislikeId, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/clickdislike")
    public ResponseEntity<LikeOrDislikeResponseDTO> clickDislike(
            @RequestParam int likeOrDislikeId,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(likeOrDislikeService.clickDislike(
                    likeOrDislikeId, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}
