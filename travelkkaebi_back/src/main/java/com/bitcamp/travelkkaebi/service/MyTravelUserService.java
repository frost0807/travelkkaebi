package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.parameter.MyTravelUserAndMannerDTO;
import com.bitcamp.travelkkaebi.dto.MyTravelUserResponseDTO;
import com.bitcamp.travelkkaebi.mapper.MyTravelUserMapper;
import com.bitcamp.travelkkaebi.model.MyTravelUserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyTravelUserService {
    private final MannerDegreeService mannerDegreeService;
    private final MyTravelUserMapper myTravelUserMapper;

    public List<MyTravelUserAndMannerDTO> selectAllWithMannerStatus(int myTravelId, int userId) {
        boolean valid = false;
        //내 여행 게시물에 속한 유저리스트 가져오기
        List<MyTravelUserResponseDTO> myTravelUserResponseDTOList
                = myTravelUserMapper.selectAll(myTravelId);
        List<MyTravelUserAndMannerDTO> myTravelUserAndMannerDTOList = new ArrayList<>();
        for (MyTravelUserResponseDTO myTravelUserResponseDTO : myTravelUserResponseDTOList) {
            myTravelUserAndMannerDTOList.add(
                    MyTravelUserAndMannerDTO.builder()
                            .myTravelUserResponseDTO(myTravelUserResponseDTO)
                            .mannerDegreeDTO(mannerDegreeService.selectOne(myTravelUserResponseDTO.getUserId(), userId))
                            .build());
            if (myTravelUserResponseDTO.getUserId() == userId) {
                valid = true;
            }
        }
        return (valid ? myTravelUserAndMannerDTOList : null);
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