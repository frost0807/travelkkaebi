package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.PickMeApplyDTO;
import com.bitcamp.travelkkaebi.service.PickMeApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/pickme")
public class PickMeApplyController {

    private final PickMeApplyService pickMeApplyService;

    @PostMapping("/apply")
    public ResponseEntity<Void> pickUp(@AuthenticationPrincipal String userId, @RequestBody PickMeApplyDTO pickMeApplyDTO) {
        pickMeApplyService.pickUp(Integer.parseInt(userId), pickMeApplyDTO);
        return ResponseEntity.ok().build();
    }

    /**
     * 내가 넣은 데려가 신청서 리스트
     */
    @GetMapping("/my/applylist")
    public ResponseEntity<ListResponseDTO> applyList(@AuthenticationPrincipal String userId, @PageableDefault Pageable pageable) {
        return ResponseEntity.ok().body(pickMeApplyService.showApplyList(Integer.parseInt(userId), pageable));
    }

    /**
     * 나를 데려가려는 코멘트 리스트
     */
    /*@GetMapping("/my/commentlist")
    public ResponseEntity<ListResponseDTO> commentList(@AuthenticationPrincipal String userId, @PageableDefault Pageable pageable) {
        return ResponseEntity.ok().body(pickMeApplyService.showCommentList(Integer.parseInt(userId), pageable));
    }*/
}