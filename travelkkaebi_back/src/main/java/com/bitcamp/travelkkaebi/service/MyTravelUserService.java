package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.MyTravelUserResponseDTO;
import com.bitcamp.travelkkaebi.dto.PrimaryIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.parameter.MyTravelIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.mapper.MyTravelUserMapper;
import com.bitcamp.travelkkaebi.model.MyTravelUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyTravelUserService {
    private final MyTravelUserMapper myTravelUserMapper;

    public List<MyTravelUserResponseDTO> selectAll(int myTravelId, int userId) {
        List<MyTravelUserResponseDTO> myTravelUserResponseDTOList
                = myTravelUserMapper.selectAll(myTravelId);
        for (MyTravelUserResponseDTO m : myTravelUserResponseDTOList) {
            if (m.getUserId() == userId) {
                return myTravelUserResponseDTOList;
            }
        }
        throw new RuntimeException("해당 사용자가 속해있는 멤버그룹이 아님");
    }

    //MyTravel게시물 생성하면서 해당게시물 접근 가능한 User테이블 생성
    public int insert(int myTravelId, int userId) {
        return myTravelUserMapper.insert(setMyTravelUserDTO(myTravelId, userId));
    }

    //해당 게시물에 속해있는 유저인지 판별하는 메소드
    public boolean checkValidUser(int myTravelId, int userId) {
        return (myTravelUserMapper.checkValidUser(setMyTravelUserDTO(myTravelId, userId))
                .orElse(0) > 0);
    }

    public MyTravelUserDTO setMyTravelUserDTO(int myTravelId, int userId) {
        return MyTravelUserDTO.builder()
                .myTravelId(myTravelId)
                .userId(userId)
                .build();
    }
}
