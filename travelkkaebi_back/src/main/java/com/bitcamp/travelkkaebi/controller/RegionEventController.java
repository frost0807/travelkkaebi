package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.RegionEventDTO;
import com.bitcamp.travelkkaebi.service.AwsS3service;
import com.bitcamp.travelkkaebi.service.RegionEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import static com.bitcamp.travelkkaebi.page.KkaebiPage.REGION_PAGE_SIZE;
import static com.bitcamp.travelkkaebi.page.KkaebiPage.REGION_START_PAGE;

@CrossOrigin
@RestController
@RequestMapping("/region/event")
@RequiredArgsConstructor
public class RegionEventController {

    private final RegionEventService regionEventService;
    private final AwsS3service awsS3service;

    @GetMapping("/main")
    public ResponseEntity<HashMap<Integer, List<RegionEventDTO>>> showRegionList(@PageableDefault(page = REGION_START_PAGE, size = REGION_PAGE_SIZE) Pageable pageable) {
        return ResponseEntity.ok().body(regionEventService.findAll(pageable));
    }

    @PostMapping("/write")
    public ResponseEntity<RegionEventDTO> regionEventWrite(
            @AuthenticationPrincipal String userId,
            @RequestPart(value = "regionEventDTO") RegionEventDTO regionEventDTO,
            @RequestPart(value = "file", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok().body(regionEventService.write(Integer.parseInt(userId), regionEventDTO, awsS3service.upload(image, "static")));
    }

    @PutMapping("/edit")
    public ResponseEntity<Void> regionEventEdit(
            @AuthenticationPrincipal String userId,
            @RequestPart(value = "regionEventDTO") RegionEventDTO regionEventDTO,
            @RequestPart(value = "file", required = false) MultipartFile image) throws IOException {
        regionEventService.edit(Integer.parseInt(userId), regionEventDTO, awsS3service.upload(image, "static"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{regionBoardId}")
    public ResponseEntity<Void> regionEventDelete(@AuthenticationPrincipal String userId, @PathVariable int regionBoardId) {
        regionEventService.delete(Integer.parseInt(userId), regionBoardId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/show/{regionBoardId}")
    public ResponseEntity<RegionEventDTO> selectOne(@PathVariable int regionBoardId) {
        return ResponseEntity.ok().body(regionEventService.showRegionEvent(regionBoardId));
    }

    @GetMapping("/home")
    public ResponseEntity<List<RegionEventDTO>> homeRegionList() {
        return ResponseEntity.ok().body(regionEventService.regionList());
    }
}