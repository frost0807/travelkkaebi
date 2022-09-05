package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ImageAndCommentDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ImageAndCommentMapper {

    int insert(ImageAndCommentDTO imageAndCommentDTO);
}
