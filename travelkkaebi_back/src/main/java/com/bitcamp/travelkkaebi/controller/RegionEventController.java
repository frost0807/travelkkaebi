package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.RegionEventDTO;
import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import com.bitcamp.travelkkaebi.service.AwsS3service;
import com.bitcamp.travelkkaebi.service.LikeOrDislikeService;
import com.bitcamp.travelkkaebi.service.RegionEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/travelkkaebi/region/event/")
@RequiredArgsConstructor
public class RegionEventController {

    private final RegionEventService regionEventService;
    private final AwsS3service awsS3service;
    private final LikeOrDislikeService likeOrDislikeService;

    @GetMapping("main")
    public ResponseEntity<List<RegionEventDTO>> regionEventShowList() {
        return ResponseEntity.ok().body(regionEventService.findAll());
    }

    @PostMapping("write")
    public ResponseEntity<RegionEventDTO> regionEventWrite(@AuthenticationPrincipal String userId,
                                                           @RequestPart(value = "regionEventDTO") RegionEventDTO regionEventDTO,
                                                           @RequestPart(value = "file", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok().body(regionEventService.write(Integer.parseInt(userId), regionEventDTO, awsS3service.upload(image, "static")));
    }

    @PutMapping("edit")
    public ResponseEntity<Void> regionEventEdit(@AuthenticationPrincipal String userId,
                                                @RequestPart(value = "regionEventDTO") RegionEventDTO regionEventDTO,
                                                @RequestPart(value = "file", required = false) MultipartFile image) throws IOException {
        regionEventService.edit(Integer.parseInt(userId), regionEventDTO, awsS3service.upload(image, "static"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete/{regionBoardId}")
    public ResponseEntity<Void> regionEventDelete(@AuthenticationPrincipal String userId, @PathVariable int regionBoardId) {
        regionEventService.delete(Integer.parseInt(userId), regionBoardId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("show/{regionBoardId}")
    public ResponseEntity<RegionEventDTO> selectOne(@PathVariable int regionBoardId) {
        return ResponseEntity.ok().body(regionEventService.showRegionEvent(regionBoardId));
    }

    @PostMapping("show/{regionBoardId}")
    public ResponseEntity<Void> updateView(@PathVariable int regionBoardId) {
        regionEventService.updateView(regionBoardId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("like")
    public ResponseEntity<?> updateLiked(@AuthenticationPrincipal String userId, @RequestBody LikeOrDislikeDTO likeOrDislikeDTO) {
        likeOrDislikeService.clickLike(likeOrDislikeDTO, Integer.parseInt(userId));
        return ResponseEntity.ok().build();
    }

}
