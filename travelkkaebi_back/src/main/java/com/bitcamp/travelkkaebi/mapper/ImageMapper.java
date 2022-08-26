package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ImageDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ImageMapper {
    @Select("SELECT board_image_id, category_id, board_id, user_id, image_url" +
            "FROM board_image WHERE category_id=#{i.categoryId} AND board_id=#{i.boardId}")
    List<ImageDTO> selectAll(@Param("i")ImageDTO imageDTO);

    @Select("SELECT board_image_id, category_id, board_id, user_id, image_url" +
            "FROM board_image WHERE board_image_id=#{imageId}")
    ImageDTO selectOne(int imageId);

    @Options(useGeneratedKeys = true, keyProperty = "imageId")
    @Insert("INSERT INTO board_image (category_id, board_id, user_id, image_url)" +
            "VALUES (#{i.categoryId}, #{i.boardId}, #{i.userId}, #{i.imageUrl})")
    int insert(@Param("i")ImageDTO imageDTO);

    @Options(useGeneratedKeys = true, keyProperty = "imageId")
    @Update("UPDATE board_image SET image_url=#{i.imageUrl}" +
            "WHERE board_image_id=#{imageId}")
    int update(@Param("i")ImageDTO imageDTO);

    @Delete("DELETE FROM board_image WHERE board_image_id=#{imageId}")
    int delete(int imageId);
}