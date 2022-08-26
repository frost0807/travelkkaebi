package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.TravelMapDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TravelMapMapper {
    @Select("SELECT * FROM travel_map WHERE category_id=#{t.categoryId} AND board_id=#{t.boardId}")
    List<TravelMapDTO> selectAll(@Param("t")TravelMapDTO travelMapDTO);

    @Insert("INSERT INTO travel_map (category_id, board_id, map_url)" +
            "VALUES (#{t.categoryId}, #{t.boardId}, #{t.mapUrl})")
    int insert(@Param("t")TravelMapDTO travelMapDTO);

    @Update("UPDATE travel_map SET map_url=#{t.mapUrl}" +
            "WHERE category_id=#{t.categoryId} AND board_id=#{t.boardId}")
    int update(@Param("t")TravelMapDTO travelMapDTO);

    @Delete("DELETE FROM travel_map WHERE category_id=#{t.categoryId} AND board_id=#{t.boardId}")
    int delete(@Param("t")TravelMapDTO travelMapDTO);
}