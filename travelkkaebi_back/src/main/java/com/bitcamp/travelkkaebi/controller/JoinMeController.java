package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import com.bitcamp.travelkkaebi.service.JoinMeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/joinme")
@RequiredArgsConstructor
public class JoinMeController {
    private final JoinMeService joinMeService;

    @PostMapping("/selectAllByPage")
    public List<JoinMeDTO> selectAllByPage(@RequestBody Map<String, Integer> pageMap){
        try{
            return joinMeService.selectAllByPage(pageMap.get("pageNo"), pageMap.get("pageSize"));
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/selectOne")
    public ResponseEntity selectOne(@RequestBody JoinMeDTO joinMeDTO){
        try{
            joinMeDTO = joinMeService.selectOne(joinMeDTO);

            return new ResponseEntity<>(joinMeDTO, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/write")
    public ResponseEntity write(@RequestBody JoinMeDTO joinMeDTO, @AuthenticationPrincipal int userId){
        try{
            int joinMeId = joinMeService.insert(joinMeDTO, userId);

            return new ResponseEntity<>(joinMeId, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody JoinMeDTO joinMeDTO, @AuthenticationPrincipal int userId){
        try{
            int joinMeId = joinMeService.update(joinMeDTO, userId);

            return new ResponseEntity<>(joinMeId, HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/delete")
    public ResponseEntity delete(@RequestBody JoinMeDTO joinMeDTO, @AuthenticationPrincipal int userId){
        try{
            int
        }
    }

}