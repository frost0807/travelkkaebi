package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.PrimaryIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.parameter.MyTravelIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.mapper.MyTravelUserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyTravelUserService {
    private final MyTravelUserMapper myTravelUserMapper;

    //MyTravel게시물 생성하면서 해당게시물 접근 가능한 User테이블 생성
    public int insert(int myTravelId, int userId) {
        return myTravelUserMapper.insert(setMyTravelIdAndUserId(myTravelId, userId));
    }

    public MyTravelIdAndUserIdDTO setMyTravelIdAndUserId(int myTravelId, int userId) {
        return MyTravelIdAndUserIdDTO.builder()
                .myTravelId(myTravelId)
                .userId(userId)
                .build();
    }

}
