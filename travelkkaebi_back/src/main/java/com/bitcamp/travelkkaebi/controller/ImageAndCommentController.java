package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.ImageAndCommentDTO;
import com.bitcamp.travelkkaebi.service.ImageAndCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/imageandcomment")
public class ImageAndCommentController {

    private final ImageAndCommentService imageAndCommentService;

    @PostMapping("/insert")
    public ResponseEntity<Boolean> insert(
            @RequestPart(value = "image") List<MultipartFile> imageList,
            @RequestPart(value = "comment") List<ImageAndCommentDTO> commentList,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(imageAndCommentService.insert(imageList, commentList,
                    Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
