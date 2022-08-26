package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface LikeOrDislikeMapper {
    //테이블 존재여부 확인하는 메소드
    @Select("SELECT like_or_dislike_id" +
            "FROM like_or_dislike" +
            "WHERE category_id = #{l.categoryId} AND board_id = #{l.board_id} AND user_id = #{l.userId}")
    int selectId(@Param("l") LikeOrDislikeDTO likeOrDislikeDTO);

    //테이블 상태 리턴하는 메소드
    @Select("SELECT like_or_dislike_id, category_id, board_id, user_id, liked, disliked" +
            "FROM like_or_dislike" +
            "WHERE like_or_dislike_id = #{likeOrDislikeId}")
    LikeOrDislikeDTO selectOne(int likeOrDislikeId);

    //테이블 생성하는 메소드
    @Options(useGeneratedKeys = true, keyProperty = "likeOrDislikeId")
    @Insert("INSERT INTO like_or_dislike (category_id, board_id, user_id)" +
            "VALUES(#{l.categoryId}, #{l.boardId}, #{l.userId})")
    int insert(@Param("l") LikeOrDislikeDTO likeOrDislikeDTO);

    //테이블 상태 갱신하는 메소드
    @Options(useGeneratedKeys = true, keyProperty = "likeOrDislikeId")
    @Update("UPDATE like_or_dislike SET liked=#{l.liked}, disliked=#{l.disliked}" +
            "WHERE like_or_dislike_id = #{likeOrDislikeId}")
    int update(@Param("l") LikeOrDislikeDTO likeOrDislikeDTO);
}
