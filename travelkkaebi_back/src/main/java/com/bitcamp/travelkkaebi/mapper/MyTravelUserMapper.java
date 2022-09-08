package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.PrimaryIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.parameter.MyTravelIdAndUserIdDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyTravelUserMapper {
    int insert(MyTravelIdAndUserIdDTO myTravelIdAndUserIdDTO);
}