package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.MyTravelResponseDTO;
import com.bitcamp.travelkkaebi.model.MyTravelDTO;
import com.bitcamp.travelkkaebi.service.MyTravelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mytravel")
@RequiredArgsConstructor
public class MyTravelController {
    private final MyTravelService myTravelService;

    //로그인한 유저가 참여하고 있는 myTravel게시물 리스트 리턴
    @GetMapping("/selectallbypage")
    public ResponseEntity<ListResponseDTO> selectAllByPage(
            @RequestParam int pageNo,
            @AuthenticationPrincipal String userId) {
        try {
            return new ResponseEntity<>(myTravelService.selectAllByPage(pageNo, Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/selectone")
    public ResponseEntity<MyTravelResponseDTO> selectOne(@RequestParam int myTravelId,
                                                         @AuthenticationPrincipal String userId) {
        try{
            return new ResponseEntity<>(myTravelService.selectOne(myTravelId, Integer.parseInt(userId)), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @PostMapping("/insert")
    public ResponseEntity<Boolean> insert(@RequestParam int joinMeId){
        try{
            return new ResponseEntity<>(myTravelService.insert(joinMeId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}
