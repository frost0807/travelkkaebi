package com.bitcamp.travelkkaebi.controller;

import com.bitcamp.travelkkaebi.model.JoinMeApplyDTO;
import com.bitcamp.travelkkaebi.service.JoinMeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/joinmeapply")
@RequiredArgsConstructor
public class JoinMeApplyController {
    private final JoinMeService joinMeService;

}