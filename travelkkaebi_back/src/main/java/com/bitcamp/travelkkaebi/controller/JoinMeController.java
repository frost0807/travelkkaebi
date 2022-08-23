package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import com.bitcamp.travelkkaebi.service.JoinMeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/joinme")
@RequiredArgsConstructor
@RestController
public class JoinMeController {
    private final JoinMeService joinMeService;

    @GetMapping("/page")
    public List<JoinMeDTO> selectAllByPage(@RequestBody int pageNo, @RequestBody int pageSize){
        try{
            return joinMeService.selectAllByPage(pageNo, pageSize);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

//    @GetMapping("/")
//    public JoinMeDTO selectOne(@RequestBody int boardId, @RequestBody int categoryId){
//        try
//    }
}
