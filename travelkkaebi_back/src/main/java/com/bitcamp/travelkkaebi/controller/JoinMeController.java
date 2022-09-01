package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import com.bitcamp.travelkkaebi.service.JoinMeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/joinme")
@RequiredArgsConstructor
public class JoinMeController {
    private final JoinMeService joinMeService;

    //pageNo에 페이지번호를 넣어서 보내주면 해당페이지의 게시물 20개를 리턴
    @GetMapping("/selectallbypage")
    public ResponseEntity<List> selectAllByPage(@RequestParam int pageNo){
        try{
            //해당 pageNo의 게시물 리스트를 리턴
            return new ResponseEntity<>(joinMeService.selectAllByPage(pageNo), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    //유저가 해당 게시물을 클릭해서 상세보기 했을 때 joinMeId를 받아서 Service로 넘겨준다.
    @GetMapping("/selectone")
    public ResponseEntity<JoinMeDTO> selectOne(@RequestParam int joinMeId){
        try{
            return new ResponseEntity<>(joinMeService.selectOne(joinMeId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    //유저가 글을 썼을 때 들어온 객체를 Service로 보내고 삽입된 객체 리턴
    @PostMapping("/insert")
    public ResponseEntity<JoinMeDTO> insert(@RequestBody JoinMeDTO joinMeDTO){
        try{
            int userId=11;
            return new ResponseEntity<>(joinMeService.insert(joinMeDTO, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    //유저가 글을 수정했을 때 수정된 객체를 받아서 Service로 넘겨주고 수정된 객체 리턴
    @PutMapping("/update")
    public ResponseEntity<JoinMeDTO> update(@RequestBody JoinMeDTO joinMeDTO){
        try{
            int userId=11;
            return new ResponseEntity<>(joinMeService.update(joinMeDTO, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    //유저가 글을 삭제했을 때 삭제할 글의 joinMeId를 받아서 Service로 넘겨준다.
    @DeleteMapping("/delete")
    public ResponseEntity<Boolean> delete(@RequestParam int joinMeId){
        try{
            int userId=11;
            return new ResponseEntity(joinMeService.delete(joinMeId, userId), HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
