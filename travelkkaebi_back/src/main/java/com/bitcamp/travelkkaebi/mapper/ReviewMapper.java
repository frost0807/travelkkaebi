package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ReviewDTO;
import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface ReviewMapper {

    // 디폴트 값 public
    @Select("SELECT review_id, category_id, user_id, title, content, region, like_count, dislike_count," +
            "view, create_time, update_time FROM board_review LIMIT #{r.startNum}, #{r.PAGE_SIZE}")
    List<ReviewDTO> selectAllByPage(@Param("r") HashMap<String, Integer> pageMap);

    @Select("SELECT review_id, category_id, user_id, title, content, region, like_count, dislike_count, view, create_time, update_time" +
            "FROM board_review WHERE review_id = #{r.reviewId}")
    ReviewDTO selectOne(@Param("r") int reviewId);

    @Insert("INSERT INTO board_review (category_id, user_id, title, content, region)" +
            "VALUES (#{r.categoryId}, #{r.userId}, #{r.title}, #{r.content}, #{r.region})")
    int insert(@Param("r") ReviewDTO reviewDTO);

    @Update("UPDATE board_review SET title = #{r.title}, content = #{r.content}, region = #{r.region}" +
            "WHERE review_id = #{r.reviewId}")
    int update(@Param("r") ReviewDTO reviewDTO);

    @Delete("DELETE FROM board_review WHERE review_id = #{reviewId}")
    int delete(int reviewId);

    @Update("UPDATE board_review SET view = #{r.view} +1 WHERE review_id = #{r.reviewId}")
    int viewPlus(@Param("r") int reviewId);











}
