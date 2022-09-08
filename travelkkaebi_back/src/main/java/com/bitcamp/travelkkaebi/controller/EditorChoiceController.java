package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.EditorChoiceResponseDTO;
import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.model.EditorChoiceDTO;
import com.bitcamp.travelkkaebi.service.EditorChoiceService;
import com.bitcamp.travelkkaebi.service.LikeOrDislikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity write(@RequestBody EditorChoiceDTO editorChoiceDTO,
                                @AuthenticationPrincipal String userId) {

       try {
            return new ResponseEntity(editorChoiceService.write(editorChoiceDTO,
                    Integer.parseInt(userId)), HttpStatus.OK);

       } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
       }
    }

    /**
     * 게시글 수정
     */

    @PutMapping("/update")
    private ResponseEntity update(@RequestBody EditorChoiceDTO editorChoiceDTO,
                                  @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity(editorChoiceService.update(editorChoiceDTO,
                    Integer.parseInt(userId)), HttpStatus.OK);
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
    private ResponseEntity<ListResponseDTO> selectAllGood(@RequestParam int pageNo) {

        try {
            List<Integer> list = likeOrDislikeService.getBoardIdListMostLiked(3, 6);
            editorChoiceService.selectAllGood(list);
            return new ResponseEntity(list, HttpStatus.OK);

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
