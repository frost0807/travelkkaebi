package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.ImageDTO;
import com.bitcamp.travelkkaebi.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
public class ImageController {
    private final ImageService imageService;

    @PostMapping("/temporaryinsert")
    public ResponseEntity<List<String>> temporaryInsert(
            @RequestPart(value = "file") List<MultipartFile> multipartFileList) {
        try {
            return new ResponseEntity<>(imageService.temporaryInsert(multipartFileList), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/selectall")
    public ResponseEntity<List> selectAll(@RequestParam int categoryId,
                                          @RequestParam int boardId) {
        try {
            return new ResponseEntity<>(imageService.selectAll(categoryId, boardId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/insert")
    public ResponseEntity<Boolean> insert(
            @RequestBody List<ImageDTO> imageDTOList,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(imageService.insert(imageDTOList, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

//    @PostMapping("/insert")
//    public ResponseEntity<Boolean> insert(
//            @RequestPart(value = "file") List<MultipartFile> multipartFileList,
//            @RequestPart(value = "imageDTO") ImageDTO imageDTO,
//            @AuthenticationPrincipal String userId) {
//        try {
//            return new ResponseEntity<>(imageService.insert(multipartFileList, imageDTO, Integer.parseInt(userId)), HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e.getMessage());
//        }
//    }

    @PutMapping("/update")
    public ResponseEntity<Boolean> update(
            @RequestPart(value = "file") List<MultipartFile> multipartFileList,
            @RequestPart(value = "imageDTO") ImageDTO imageDTO,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(imageService.update(multipartFileList, imageDTO, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(
            @RequestParam List<Integer> imageIdList,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(imageService.delete(imageIdList, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}