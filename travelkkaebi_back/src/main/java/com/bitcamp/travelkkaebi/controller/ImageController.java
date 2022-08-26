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

    @GetMapping("/selectall")
    public ResponseEntity<List> selectAll(@RequestBody ImageDTO i){
        try{
            return new ResponseEntity<>(imageService.selectAll(i), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/insert")
    public ResponseEntity<ImageDTO> insert(@RequestPart(value="file", required = true)MultipartFile m,
                                          @RequestPart(value="imageDTO")ImageDTO i,
                                          @AuthenticationPrincipal int userId){
        try{
            return new ResponseEntity<>(imageService.insert(m, i, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ImageDTO> update(@RequestPart(value="file", required = true)MultipartFile m,
                                          @RequestPart(value="imageDTO")ImageDTO i,
                                          @AuthenticationPrincipal int userId){
        try{
            return new ResponseEntity<>(imageService.update(m, i, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Integer> delete(@RequestParam int imageId,
                                          @AuthenticationPrincipal int userId){
        try{
            return new ResponseEntity<>(imageService.delete(imageId, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(0, HttpStatus.OK);
        }
    }
}