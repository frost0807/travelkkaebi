package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import org.apache.ibatis.annotations.*;

import java.util.HashMap;

@Mapper
public interface LikeOrDislikeMapper {
    //테이블 존재여부 확인하는 메소드
    LikeOrDislikeDTO selectOneByDTO(LikeOrDislikeDTO likeOrDislikeDTO);
    //테이블 상태 리턴하는 메소드
    LikeOrDislikeDTO selectOne(int likeOrDislikeId);
    //테이블 생성하는 메소드
    int insert(LikeOrDislikeDTO likeOrDislikeDTO);
    //테이블 상태 갱신하는 메소드
    int update(LikeOrDislikeDTO likeOrDislikeDTO);
    int getLikeCount(LikeOrDislikeDTO likeOrDislikeDTO);
    int getDislikeCount(LikeOrDislikeDTO likeOrDislikeDTO);
}