package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.MyTravelReplyResponseDTO;
import com.bitcamp.travelkkaebi.dto.parameter.PageAndMyTravelIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.model.MyTravelReplyDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyTravelReplyMapper {
    int count(int myTravelId);
    List<MyTravelReplyResponseDTO> selectAllByTravelId(
            PageAndMyTravelIdAndUserIdDTO pageAndMyTravelIdAndUserIdDTO);

    int insert(MyTravelReplyDTO myTravelReplyDTO);
}