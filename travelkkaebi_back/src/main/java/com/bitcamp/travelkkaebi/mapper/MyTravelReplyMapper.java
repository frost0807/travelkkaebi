package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.MyTravelReplyDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MyTravelReplyMapper {
    MyTravelReplyDTO selectAllByMyTravelId(int myTravelId);
    int insert(MyTravelReplyDTO myTravelReplyDTO);
}