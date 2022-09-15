package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.dto.LogInDTO;
import com.bitcamp.travelkkaebi.service.KaKaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/travelkkaebi")
public class KaKaoController {

    private final KaKaoService kaKaoService;

    @GetMapping("/auth/kakao")
    public ResponseEntity<LogInDTO> oauthKakao(@RequestParam(value = "code", required = false) String authorizeCode) {
        System.out.println(authorizeCode);
        return ResponseEntity.ok().body(kaKaoService.kaKaoAuth(authorizeCode));
    }
}
