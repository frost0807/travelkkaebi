package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import com.bitcamp.travelkkaebi.model.ResponseDTO;
import com.bitcamp.travelkkaebi.service.JoinMeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/joinme")
@RequiredArgsConstructor
@RestController
public class JoinMeController {
    /*
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


    /*
    @PostMapping("/selectOne")
    public ResponseEntity selectOne(@RequestBody JoinMeDTO joinMeDTO){
        try{
            joinMeDTO = joinMeService.selectOne(joinMeDTO);
            ResponseDTO response = ResponseDTO.builder().responseList().build();

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(Exception e){
            //throw e;
        }
    } */
}
