package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.DeleteUserDTO;
import com.bitcamp.travelkkaebi.dto.LogInDTO;
import com.bitcamp.travelkkaebi.dto.UserDTO;
import com.bitcamp.travelkkaebi.dto.UserUpdateDTO;
import com.bitcamp.travelkkaebi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/travelkkaebi")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * 회원가입 Create
     */
    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestPart(value = "file", required = false) MultipartFile multipartFile,
                                       @RequestPart(value = "userDTO") @Valid UserDTO userDTO) {
        userService.register(userDTO, multipartFile);
        return ResponseEntity.ok().build();
    }

    /**ㄹ
     * 회원아이디 확인 중복버튼
     */
    @GetMapping("/username/check")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        return ResponseEntity.ok().body(userService.usernameCheck(username));
    }

    /**
     * userNickname 중복체크
     */
    @GetMapping("/nickname/check")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok().body(userService.nicknameCheck(nickname));
    }

    /**
     * 로그인
     */
    @PostMapping("/signin")
    public ResponseEntity<LogInDTO> auth(@RequestBody LogInDTO logInDTO) {
        return ResponseEntity.ok().body(userService.auth(logInDTO.getUsername(), logInDTO.getPassword()));
    }

    /**
     * 회원정보수정 Update
     */
    @PutMapping("/update")
    public ResponseEntity<Void> userUpdate(@RequestPart(value = "image", required = false) MultipartFile image,
                                           @RequestPart UserUpdateDTO userUpdateDTO) {
        userService.update(userUpdateDTO, image);
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 delete
     */
    @DeleteMapping("/delete")
    public ResponseEntity<Void> userDelete(@RequestBody DeleteUserDTO deleteUserDTO) {
        userService.delete(deleteUserDTO);
        return ResponseEntity.ok().build();
    }
}