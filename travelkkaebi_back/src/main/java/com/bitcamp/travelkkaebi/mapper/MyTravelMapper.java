package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.JoinMeIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.MyTravelResponseDTO;
import com.bitcamp.travelkkaebi.dto.PageAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.PrimaryIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.model.MyTravelDTO;
import com.bitcamp.travelkkaebi.model.MyTravelReplyDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MyTravelMapper {
    List<MyTravelResponseDTO> selectAllByPage(PageAndUserIdDTO pageAndUserIdDTO);
    MyTravelResponseDTO selectOne(PrimaryIdAndUserIdDTO primaryIdAndUserIdDTO);

    int count(PageAndUserIdDTO pageAndUserIdDTO);

    int insert(MyTravelDTO myTravelDTO);
}