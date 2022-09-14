package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.model.MyTravelReplyDTO;
import com.bitcamp.travelkkaebi.service.MyTravelReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mytravel/reply")
@RequiredArgsConstructor
public class MyTravelReplyController {
    private final MyTravelReplyService myTravelReplyService;

    @GetMapping("/selectall")
    public ResponseEntity<ListResponseDTO> selectAll(
            @RequestParam int pageNo,
            @RequestParam int myTravelId,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(myTravelReplyService.selectAll(pageNo, myTravelId, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/insert")
    public ResponseEntity<Boolean> insert(@RequestBody MyTravelReplyDTO myTravelReplyDTO,
                                          @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(myTravelReplyService.insert(myTravelReplyDTO
                    , Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}