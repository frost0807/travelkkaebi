package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.MyTravelReplyResponseDTO;
import com.bitcamp.travelkkaebi.dto.parameter.PageAndMyTravelIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.mapper.MyTravelReplyMapper;
import com.bitcamp.travelkkaebi.model.MyTravelReplyDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyTravelReplyService {
    private final int PAGE_SIZE = 20;
    private final MyTravelUserService myTravelUserService;
    private final MyTravelReplyMapper myTravelReplyMapper;

    public ListResponseDTO selectAll(int pageNo, int myTravelId, int userId) {
        if (myTravelUserService.checkValidUser(myTravelId, userId)) {
            List<MyTravelReplyResponseDTO> myTravelReplyResponseDTOList
                    = myTravelReplyMapper.selectAllByTravelId(setPageAndMyTravelIdAndUserId(pageNo, myTravelId, userId));

            return setListResponseDTO(myTravelReplyMapper.count(myTravelId), myTravelReplyResponseDTOList);
        } else {
            throw new RuntimeException("해당 유저의 게시물이 아닙니다.");
        }
    }

    public boolean insert(MyTravelReplyDTO myTravelReplyDTO, int userId) {
        myTravelReplyDTO.setUserId(userId);

        return (myTravelReplyMapper.insert(myTravelReplyDTO) == 1);
    }


    public PageAndMyTravelIdAndUserIdDTO setPageAndMyTravelIdAndUserId(int pageNo, int myTravelId, int userId) {
        return PageAndMyTravelIdAndUserIdDTO.builder()
                .startNum((pageNo - 1) * PAGE_SIZE)
                .pageSize(PAGE_SIZE)
                .myTravelId(myTravelId)
                .userId(userId)
                .build();
    }

    public ListResponseDTO setListResponseDTO(int totalBoardCount, List<MyTravelReplyResponseDTO> myTravelReplyResponseDTOList) {
        return ListResponseDTO.builder()
                .totalBoardCount(totalBoardCount)
                .list(myTravelReplyResponseDTOList)
                .build();
    }
}
