package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface JoinMeMapper {
    //    @Results(id = "result", value = {
//            @Result(column = "join_me_id", property = "joinMeId", jdbcType = JdbcType.INTEGER, id = true),
//            @Result(column = "category_id", property = "categoryId", jdbcType = JdbcType.INTEGER),
//            @Result(column = "user_id", property = "userId", jdbcType = JdbcType.INTEGER),
//            @Result(column = "view", property = "view", jdbcType = JdbcType.INTEGER),
//            @Result(column = "title", property = "title", jdbcType = JdbcType.VARCHAR),
//            @Result(column = "content", property = "content", jdbcType = JdbcType.VARCHAR),
//            @Result(column = "start_date", property = "startDate", jdbcType = JdbcType.TIMESTAMP),
//            @Result(column = "end_date", property = "endDate", jdbcType = JdbcType.TIMESTAMP),
//            @Result(column = "region", property = "region", jdbcType = JdbcType.VARCHAR),
//            @Result(column = "charge", property = "charge", jdbcType = JdbcType.INTEGER),
//            @Result(column = "capacity", property = "capacity", jdbcType = JdbcType.INTEGER),
//            @Result(column = "like_count", property = "likeCount", jdbcType = JdbcType.INTEGER),
//            @Result(column = "closed", property = "closed", jdbcType = JdbcType.TINYINT),
//            @Result(column = "create_time", property = "createTime", jdbcType = JdbcType.TIMESTAMP),
//            @Result(column = "update_time", property = "updateTime", jdbcType = JdbcType.TIMESTAMP)
//    })
//
//    @ResultMap("result")
//    @Select("SELECT join_me_id, user_id, category_id, view, title, content, region, charge," +
//            "capacity, like_count, closed, start_date, end_date, create_time, update_time" +
//            " FROM board_join_me WHERE category_id=#{j.categoryId} AND join_me_id=#{j.joinMeId}")
//    JoinMeDTO selectOne(@Param("j") JoinMeDTO joinMeDTO);
//
//    @Select("SELECT  join_me_id, user_id, category_id, view, title, content, region, charge," +
//            "capacity, like_count, closed, start_date, end_date, create_time, update_time" +
//            " FROM board_join_me LIMIT #{p.startNum}, #{p.pageSize} ORDER BY join_me_id DESC")
//    List<JoinMeDTO> selectAllByPage(@Param("p")HashMap<String, Integer> pageMap);
//
//    @Insert("INSERT INTO board_join_me" +
//            "(category_id, user_id, title, content, region, charge, capacity) " +
//            "VALUES (#{j.categoryId}, #{j.userId}, #{j.title}, #{j.content}, #{j.region}, #{j.charge}, #{j.capacity})")
//    int insert(@Param("j")JoinMeDTO joinMeDTO);
//
//    @Update("UPDATE board_join_me SET" +
//            "title=#{j.title}, content=#{j.content}, start_date=#{j.startDate}, end_date=#{j.endDate}," +
//            "region=#{j.region}, charge=#{j.charge}, capacity=#{j.capacity}" +
//            "WHERE category_id=#{j.categoryId} AND join_me_id=#{j.joinMeId}")
//    int update(@Param("j")JoinMeDTO joinMeDTO);
//
//    @Delete("DELETE FROM board_join_me WHERE category_id=#{j.categoryId} AND join_me_id=#{j.joinMeId}")
//    int delete(@Param("j")JoinMeDTO joinMeDTO);

}