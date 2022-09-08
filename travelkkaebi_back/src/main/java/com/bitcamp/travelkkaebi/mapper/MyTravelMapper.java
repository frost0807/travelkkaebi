package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.JoinMeIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.model.MyTravelDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyTravelMapper {
    int insert(MyTravelDTO myTravelDTO);
}