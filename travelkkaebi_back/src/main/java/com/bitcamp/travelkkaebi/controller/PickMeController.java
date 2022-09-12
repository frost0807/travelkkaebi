package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.PickMeDTO;
import com.bitcamp.travelkkaebi.service.PickMeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.bitcamp.travelkkaebi.page.KkaebiPage.PICK_ME_PAGE_SIZE;

@CrossOrigin
@RestController
@RequestMapping("/pickme")
@RequiredArgsConstructor
public class PickMeController {

    private final PickMeService pickMeService;


    /**
     * pickMe 게시글 20개씩 pagination return
     */
    @GetMapping("/list")
    public ResponseEntity<ListResponseDTO> showRegionList(@PageableDefault(size = PICK_ME_PAGE_SIZE) Pageable pageable) {
        return ResponseEntity.ok().body(pickMeService.findAll(pageable));
    }


    /**
     * pickMe write
     */
    @PostMapping("/write")
    public ResponseEntity<PickMeDTO> pickMeWrite(@AuthenticationPrincipal String userId, @RequestBody PickMeDTO pickMeDTO) {
        return ResponseEntity.ok().body(pickMeService.write(Integer.parseInt(userId), pickMeDTO));
    }

    /**
     * pickMe update
     */
    @PutMapping("/update")
    public ResponseEntity<PickMeDTO> pickMeUpdate(@AuthenticationPrincipal String userId, @RequestBody PickMeDTO pickMeDTO) {
        return ResponseEntity.ok().body(pickMeService.update(Integer.parseInt(userId), pickMeDTO));
    }

    /**
     * pickMe delete
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Void> pickMeDelete(@AuthenticationPrincipal String userId, @RequestParam int pickMeId) {
        pickMeService.delete(Integer.parseInt(userId), pickMeId);
        return ResponseEntity.ok().build();
    }

    /**
     * pickMe search by nickname 20개 씩
     */
    @GetMapping("/search/nickname")
    public ResponseEntity<ListResponseDTO> findByNickname(
            @PageableDefault(size = PICK_ME_PAGE_SIZE) Pageable pageable,
            @RequestParam String nickname) {
        return ResponseEntity.ok().body(pickMeService.findByNickname(nickname, pageable));
    }

    /**
     * pickMe search by title 20개 씩
     */
    @GetMapping("/search/title")
    public ResponseEntity<ListResponseDTO> findByTitle(
            @PageableDefault(size = PICK_ME_PAGE_SIZE) Pageable pageable,
            @RequestParam String title) {
        return ResponseEntity.ok().body(pickMeService.findByTitle(title, pageable));
    }

    /**
     * pickMe search by keyword 20개 씩
     */
    @GetMapping("/search/keyword")
    public ResponseEntity<ListResponseDTO> findByKeyword(
            @PageableDefault(size = PICK_ME_PAGE_SIZE) Pageable pageable,
            @RequestParam String keyword) {
        return ResponseEntity.ok().body(pickMeService.findByKeyword(keyword, pageable));
    }

    /**
     * 게시물 상세보기
     */
    @GetMapping("/show/{boardId}")
    public ResponseEntity<PickMeDTO> findOne(@PathVariable int boardId) {
        return ResponseEntity.ok().body(pickMeService.findById(boardId));
    }

}
