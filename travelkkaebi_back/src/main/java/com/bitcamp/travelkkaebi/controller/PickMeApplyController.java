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
     * 나를 데려가고싶어하는 사람들 리스트
     */
    @GetMapping("/my/takemelist")
    public ResponseEntity<ListResponseDTO> wantToTakeMeList(@AuthenticationPrincipal String userId) {
        return ResponseEntity.ok().body(pickMeApplyService.wantToTakeMeList(Integer.parseInt(userId)));
    }

    /**
     * 채택 상태 리스트
     * picked false -> 채택되기전
     *        true -> 채택됨
     */
    @GetMapping("/picked/status")
    public ResponseEntity<ListResponseDTO> pickedStatusList(@AuthenticationPrincipal String userId, @RequestParam boolean picked) {
        return ResponseEntity.ok().body(pickMeApplyService.pickedStatusList(Integer.parseInt(userId), picked));
    }

    /**
     * 채택 toggle
     */
    @PutMapping("/selected")
    public ResponseEntity<Void> selected(@AuthenticationPrincipal String userId, @RequestParam int pickMeApplyId) {
        pickMeApplyService.selected(Integer.parseInt(userId), pickMeApplyId);
        return ResponseEntity.ok().build();
    }

}