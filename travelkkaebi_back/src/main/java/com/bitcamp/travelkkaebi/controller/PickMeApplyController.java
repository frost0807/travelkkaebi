package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.PickMeApplyDTO;
import com.bitcamp.travelkkaebi.service.PickMeApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/travelkkaebi/pickme")
public class PickMeApplyController {

    private final PickMeApplyService pickMeApplyService;

    @PostMapping("/apply")
    public ResponseEntity<Void> pickUp(@AuthenticationPrincipal String userId, @RequestBody PickMeApplyDTO pickMeApplyDTO) {
        pickMeApplyService.pickUp(Integer.parseInt(userId), pickMeApplyDTO);
        return ResponseEntity.ok().build();
    }
}
