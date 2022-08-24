package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewDTO> selectAll();
    ReviewDTO selectOne(int id);
    int insert(ReviewDTO reviewDTO);
    int update(ReviewDTO reviewDTO);
    int delete(int id);
}
