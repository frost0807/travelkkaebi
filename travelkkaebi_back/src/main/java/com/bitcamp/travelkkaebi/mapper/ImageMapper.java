package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ImageDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface ImageMapper {
    @Select("SELECT * FROM board_image WHERE category_id=#{i.categoryId} AND board_id=#{i.boardId}")
    ImageDTO selectAll(@Param("i")ImageDTO imageDTO);

    @Insert("INSERT INTO board_image (category_id, board_id, image_url)" +
            "VALUES (#{i.categoryId}, #{i.boardId}, #{i.imageUrl})")
    int insert(@Param("i")ImageDTO imageDTO);

    @Update("UPDATE board_image SET image_url=#{i.imageUrl}" +
            "WHERE category_id=#{i.categoryId} AND board_id=#{i.boardId}")
    int update(@Param("i")ImageDTO imageDTO);

    @Delete("DELETE FROM board_image WHERE category_id=#{i.categoryId} AND board_id=#{i.boardId}")
    int delete(@Param("i")ImageDTO imageDTO);
}
