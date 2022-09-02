package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.JoinMeApplyMapper;
import com.bitcamp.travelkkaebi.model.JoinMeApplyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JoinMeApplyService {
    private final JoinMeApplyMapper joinMeApplyMapper;

    public boolean insert(JoinMeApplyDTO joinMeApplyDTO, int userId){

    }
}
