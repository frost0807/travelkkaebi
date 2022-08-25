package com.bitcamp.travelkkaebi.kakao;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class KaKaoController {

    private final KaKaoService kaKaoService;

    // 카카오 연동정보 조회 + DB에 회원 정보넣기
    @GetMapping("/selectMyAccessTocken")
    public ResponseEntity<?> oauthKakao(@RequestParam(value = "code", required = false) String code,
                                        HttpServletRequest req) throws Exception {
        return ResponseEntity.ok().body(kaKaoService.kaKaoAuth(code, req));
    }
}
