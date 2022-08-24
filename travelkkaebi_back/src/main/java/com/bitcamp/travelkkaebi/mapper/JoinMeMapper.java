package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface JoinMeMapper {
    @Select("SELECT * FROM board_join_me WHERE category_id=#{j.categoryId} AND join_me_id=#{j.joinMeId}")
    JoinMeDTO selectOne(@Param("j") JoinMeDTO joinMeDTO);

    @Select("SELECT * FROM board_join_me LIMIT #{pMap.startNum}, #{pMap.pageSize} ORDER BY join_me_id DESC")
    List<JoinMeDTO> selectAllByPage(@Param("pMap") HashMap<String, Integer> pageMap);

    @Insert("INSERT INTO board_join_me" +
            "(category_id, user_id, title, content, start_date, end_date, region, charge, capacity) " +
            "VALUES (#{j.categoryId}, #{j.userId}, #{j.title}, #{j.content},#{j.start_date}, #{j.end_date}," +
            "#{j.region}, #{j.charge}, #{j.capacity})")
    int insert(@Param("j") JoinMeDTO joinMeDTO);

    @Update("UPDATE board_join_me SET" +
            "title=#{j.title}, content=#{j.content}, start_date=#{j.startDate}, end_date=#{j.endDate}," +
            "region=#{j.region}, charge=#{j.charge}, capacity=#{j.capacity}" +
            "WHERE category_id=#{j.categoryId} AND join_me_id=#{j.joinMeId}")
    int update(@Param("j") JoinMeDTO joinMeDTO);

    @Delete("DELETE FROM board_join_me WHERE category_id=#{j.categoryId} AND join_me_id=#{j.joinMeId}")
    int delete(@Param("j") JoinMeDTO joinMeDTO);
}