package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import com.bitcamp.travelkkaebi.service.LikeOrDislikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/likeordislike")
@RequiredArgsConstructor
public class LikeOrDislikeController {
    private final LikeOrDislikeService likeOrDislikeService;

    @PostMapping("/selectone")
    public ResponseEntity<LikeOrDislikeDTO> selectOne(LikeOrDislikeDTO l, @AuthenticationPrincipal int userId){
        try{
            return new ResponseEntity<>(likeOrDislikeService.selectOne(l, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/clicklike")
    public ResponseEntity<LikeOrDislikeDTO> clickLike(LikeOrDislikeDTO l, @AuthenticationPrincipal int userId){
        try{
            return new ResponseEntity<>(likeOrDislikeService.clickLike(l, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/clickdislike")
    public ResponseEntity<LikeOrDislikeDTO> clickDislike(LikeOrDislikeDTO l, @AuthenticationPrincipal int userId){
        try{
            return new ResponseEntity<>(likeOrDislikeService.clickDislike(l, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
