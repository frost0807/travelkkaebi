package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.EditorChoiceResponseDTO;
import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.ReviewResponseDTO;
import com.bitcamp.travelkkaebi.model.EditorChoiceDTO;
import com.bitcamp.travelkkaebi.service.EditorChoiceService;
import com.bitcamp.travelkkaebi.service.LikeOrDislikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/editorchoice")
@RequiredArgsConstructor
public class EditorChoiceController {

    private final EditorChoiceService editorChoiceService;
    private final LikeOrDislikeService likeOrDislikeService;

    /**
     * 게시글 작성
     */
    @PostMapping("/write")
    public ResponseEntity<Boolean> write(@RequestPart(value = "editorchoice") EditorChoiceDTO editorChoiceDTO,
                                         @RequestPart(value = "file1", required = false) MultipartFile image1,
                                         @RequestPart(value = "file2", required = false) MultipartFile image2,
                                         @RequestPart(value = "file3", required = false) MultipartFile image3,
                                         @AuthenticationPrincipal String userId) {


       try {
            return new ResponseEntity(editorChoiceService.write(editorChoiceDTO,
                    image1, image2, image3, Integer.parseInt(userId)), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 게시글 수정
     */
    @PutMapping("/update")
    private ResponseEntity update(@RequestPart(value = "editorchoice") EditorChoiceDTO editorChoiceDTO,
                                  @RequestPart(value = "file1", required = false) MultipartFile image1,
                                  @RequestPart(value = "file2", required = false) MultipartFile image2,
                                  @RequestPart(value = "file3", required = false) MultipartFile image3,
                                  @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity(editorChoiceService.update(editorChoiceDTO,
                    image1, image2, image3, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 게시글 삭제
     */
    @DeleteMapping("/delete")
    private ResponseEntity delete(@RequestBody EditorChoiceDTO editorChoiceDTO, @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity(editorChoiceService.delete(editorChoiceDTO,
                    Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 게시글 리스트
     */
    @GetMapping("/selectallbypage")
    private ResponseEntity<ListResponseDTO> selectAllByPage(@RequestParam int pageNo) {

        try {
            return new ResponseEntity(editorChoiceService.selectAllByPage(pageNo), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 게시글 리스트 (신규)
     */
    @GetMapping("/selectallnew")
    private ResponseEntity<ListResponseDTO> selectAllNew() {
        try {
            return new ResponseEntity(editorChoiceService.selectAllNew(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 게시글 리스트 (추천)
     */
    @GetMapping("/selectallgood")
    private ResponseEntity<List<EditorChoiceResponseDTO>> selectAllGood() {

        try {
            List<Integer> boardIdList = likeOrDislikeService.getBoardIdListMostLiked(3, 3);
            return new ResponseEntity(editorChoiceService.selectAllGood(boardIdList), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 메인 게시글 리스트 (추천)
     */
    @GetMapping("/home")
    private ResponseEntity<List<EditorChoiceResponseDTO>> selectAllForHome() {

        try {
            List<Integer> boardIdList = likeOrDislikeService.getBoardIdListMostLiked(3, 6);

            return new ResponseEntity(editorChoiceService.selectAllGood(boardIdList), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 게시글 상세보기
     */
    @GetMapping("/selectone")
    private ResponseEntity<EditorChoiceResponseDTO> selectOne(@RequestParam int editorChoiceId) {

        try {
            return new ResponseEntity(editorChoiceService.selectOne(editorChoiceId), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    /**
     * 게시물 갯수 반환
     */
    @GetMapping("/count")
    private ResponseEntity count() {

        try {
            return new ResponseEntity(editorChoiceService.count(), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 특정 제목으로 검색
     */
    @GetMapping("/selectallbypage/searchbytitle")
    private ResponseEntity<ListResponseDTO> searchByTitle(@RequestParam("title") String word, int pageNo) {

        try {
            return new ResponseEntity(editorChoiceService.searchByTitle(word, pageNo), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 특정 내용으로 검색
     */
    @GetMapping("/selectallbypage/searchbycontent")
    private ResponseEntity<ListResponseDTO> searchByContent(@RequestParam("content") String word, int pageNo) {

        try {
            return new ResponseEntity(editorChoiceService.searchByContent(word, pageNo), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * 특정 작성자로 검색
     */
    @GetMapping("/selectallbypage/searchbywriter")
    private ResponseEntity<ListResponseDTO> searchByWriter(@RequestParam("writer") String word, int pageNo) {

        try {
            return new ResponseEntity(editorChoiceService.searchByWriter(word, pageNo), HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    /**
     * (지역) 키워드로 검색
     */
    @GetMapping("/selectallbypage/keywordbyregion")
    private ResponseEntity<ListResponseDTO> keywordByRegion (@RequestParam("region") String word, int pageNo) {

        try {
            return new ResponseEntity(editorChoiceService.keywordByRegion(word, pageNo), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}
