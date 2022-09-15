package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.MannerDegreeResponseDTO;
import com.bitcamp.travelkkaebi.model.MannerDegreeDTO;
import com.bitcamp.travelkkaebi.service.MannerDegreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mannerdegree")
@RequiredArgsConstructor
public class MannerDegreeController {
    private final MannerDegreeService mannerDegreeService;

    //fromUser의 toUser에대한 매너온도 클릭 상태를 리턴해주는 메소드
    @GetMapping("/selectone")
    public ResponseEntity<MannerDegreeDTO> selectOne(
            @RequestParam int toUserId,
            @AuthenticationPrincipal String fromUserId) {
        try {
            return new ResponseEntity<>(mannerDegreeService.selectOne(toUserId,
                    Integer.parseInt(fromUserId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping("/selectall/byuserlist")
    public ResponseEntity<List<MannerDegreeDTO>> selectAllByUserList(
            @RequestParam List<Integer> userList,
            @AuthenticationPrincipal String userId) {
        try {
            for (int i : userList) {
                System.out.println("user : " + i);
            }
            return new ResponseEntity<>(mannerDegreeService.selectAllByUserList(userList,
                    Integer.parseInt(userId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/clickplus")
    public ResponseEntity<MannerDegreeDTO> clickPlus(
            @RequestParam int mannerDegreeId,
            @AuthenticationPrincipal String fromUserId) {
        try {
            return new ResponseEntity<>(mannerDegreeService.plusMannerDegree(mannerDegreeId,
                    Integer.parseInt(fromUserId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
    @PutMapping("/clickminus")
    public ResponseEntity<MannerDegreeDTO> clickMinus(
            @RequestParam int mannerDegreeId,
            @AuthenticationPrincipal String fromUserId) {
        try {
            return new ResponseEntity<>(mannerDegreeService.minusMannerDegree(mannerDegreeId,
                    Integer.parseInt(fromUserId)), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }
}