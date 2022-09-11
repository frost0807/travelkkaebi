package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.PrimaryIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.parameter.MyTravelIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.model.MyTravelUserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyTravelUserMapper {
    int insert(MyTravelUserDTO myTravelUserDTO);
}