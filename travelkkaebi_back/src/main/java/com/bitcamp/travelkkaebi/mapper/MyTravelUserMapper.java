package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.MyTravelUserResponseDTO;
import com.bitcamp.travelkkaebi.dto.PrimaryIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.parameter.MyTravelIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.model.MyTravelUserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MyTravelUserMapper {
    int insert(MyTravelUserDTO myTravelUserDTO);
    List<MyTravelUserResponseDTO> selectAll(int myTravelId);
    Optional<Integer> checkValidUser(MyTravelUserDTO myTravelUserDTO);
}