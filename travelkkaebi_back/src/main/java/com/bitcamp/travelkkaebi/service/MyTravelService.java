package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.MyTravelResponseDTO;
import com.bitcamp.travelkkaebi.mapper.MyTravelMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyTravelService {
    private final MyTravelMapper myTravelMapper;

    public ListResponseDTO selectAll(int pageNo, int userId){
        return null;
    }

    public MyTravelResponseDTO selectOne(int myTravelId, int userId){
        return null;
    }


    //응답객체에 게시물리스트와 총페이지수 세팅해주는 메소드
    public ListResponseDTO setListResponse(int totalPageCount, List<MyTravelResponseDTO> myTravelResponseDTOList) {
        return ListResponseDTO.builder()
                .totalBoardCount(totalPageCount)
                .list(myTravelResponseDTOList)
                .build();
    }
}
