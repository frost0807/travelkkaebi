package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import com.bitcamp.travelkkaebi.service.LikeOrDislikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/likeordislike")
@RequiredArgsConstructor
public class LikeOrDislikeController {
    private final LikeOrDislikeService likeOrDislikeService;

    @PostMapping("/selectone")
    public ResponseEntity<LikeOrDislikeDTO> selectOne(@RequestBody LikeOrDislikeDTO l){
        try{
            int userId=11;
            return new ResponseEntity<>(likeOrDislikeService.selectOne(l, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/clicklike")
    public ResponseEntity<LikeOrDislikeDTO> clickLike(@RequestBody LikeOrDislikeDTO l){
        try{
            int userId = 11;
            return new ResponseEntity<>(likeOrDislikeService.clickLike(l, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PutMapping("/clickdislike")
    public ResponseEntity<LikeOrDislikeDTO> clickDislike(@RequestBody LikeOrDislikeDTO l){
        try{
            int userId = 11;
            return new ResponseEntity<>(likeOrDislikeService.clickDislike(l, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/getcount")
    public ResponseEntity<HashMap<String, Integer>> getCount(@RequestBody LikeOrDislikeDTO likeOrDislikeDTO){
        try{
            return new ResponseEntity<>(likeOrDislikeService.getCount(likeOrDislikeDTO), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
