package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LikeOrDislikeMapper {
    LikeOrDislikeDTO selectOne(LikeOrDislikeDTO likeOrDislikeDTO);
    int insert(LikeOrDislikeDTO likeOrDislikeDTO);
    int update(LikeOrDislikeDTO likeOrDislikeDTO);
    int delete(int likeOrDislikeId);
}
