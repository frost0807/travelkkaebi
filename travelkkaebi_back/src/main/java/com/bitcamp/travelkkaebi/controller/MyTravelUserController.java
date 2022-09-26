package com.bitcamp.travelkkaebi.controller;


import com.bitcamp.travelkkaebi.dto.parameter.MyTravelUserAndMannerDTO;
import com.bitcamp.travelkkaebi.service.MyTravelUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mytravel/user")
@RequiredArgsConstructor
public class MyTravelUserController {
    private final MyTravelUserService myTravelUserService;

    @GetMapping("/selectall")
    public ResponseEntity<List<MyTravelUserAndMannerDTO>> selectAllWithMannerStatus(
            @RequestParam int myTravelId,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(myTravelUserService.selectAllWithMannerStatus(myTravelId,
                    Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}