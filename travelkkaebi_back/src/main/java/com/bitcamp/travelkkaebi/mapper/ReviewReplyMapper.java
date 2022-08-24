package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewReplyMapper {
    int insert(ReviewReplyDTO reviewReplyDTO);
    int update(ReviewReplyDTO reviewReplyDTO);
    int delete();
    List<ReviewReplyDTO> selectOne(int id);
}
