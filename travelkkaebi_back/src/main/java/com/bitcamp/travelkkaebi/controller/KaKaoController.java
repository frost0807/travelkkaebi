package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.service.KaKaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/travelkkaebi")
public class KaKaoController {

    private final KaKaoService kaKaoService;

    @GetMapping("/auth/kakao")
    public ResponseEntity<String> oauthKakao(@RequestParam(value = "code", required = false) String authorizeCode) {
        return ResponseEntity.ok().body(kaKaoService.kaKaoAuth(authorizeCode));
    }
}
