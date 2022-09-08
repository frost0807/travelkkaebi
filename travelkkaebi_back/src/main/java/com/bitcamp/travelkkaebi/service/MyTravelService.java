package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.JoinMeIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.MyTravelResponseDTO;
import com.bitcamp.travelkkaebi.mapper.MyTravelMapper;
import com.bitcamp.travelkkaebi.mapper.MyTravelUserMapper;
import com.bitcamp.travelkkaebi.model.MyTravelDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyTravelService {
    private final JoinMeService joinMeService;
    private final MyTravelMapper myTravelMapper;
    private final MyTravelUserService myTravelUserService;

    public ListResponseDTO selectAll(int pageNo, int userId) {
        return null;
    }

    public MyTravelResponseDTO selectOne(int myTravelId, int userId) {
        return null;
    }

    public boolean insert(int joinMeId) {
        //key리턴을 위해 DTO에 joinMeId 세팅
        MyTravelDTO myTravelDTO = MyTravelDTO.builder().joinMeId(joinMeId).build();
        //myTravel 삽입성공하면
        if (myTravelMapper.insert(myTravelDTO) == 1) {
            //삽입된 myTravelId 리턴
            int myTravelId = myTravelDTO.getMyTravelId();
            int successCount = 0;
            List<Integer> userList = joinMeService.getAppliedAndWriterList(joinMeId);
            //userList에 있는 userId들을 MyTravelUser
            for (int userId : userList) {
                successCount += myTravelUserService.insert(myTravelId, userId);
            }
            //모두 다 성공했는지 여부 리턴
            return (successCount == userList.size());
        } else {
            throw new RuntimeException("myTravel게시물 삽입 실패");
        }
    }

    //응답객체에 게시물리스트와 총페이지수 세팅해주는 메소드
    public ListResponseDTO setListResponse(int totalPageCount, List<MyTravelResponseDTO> myTravelResponseDTOList) {
        return ListResponseDTO.builder()
                .totalBoardCount(totalPageCount)
                .list(myTravelResponseDTOList)
                .build();
    }
}