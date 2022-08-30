package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import org.apache.ibatis.annotations.Mapper;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ReviewReplyMapper {
    @Insert("INSERT INTO review_reply (category_id, board_id, user_id, comment)" +
            "VALUES (#{r.categoryId}, #{r.boardId}, #{r.userId}, #{r.comment})")
    int insert(@Param("r") ReviewReplyDTO replyDTO);

    @Update("UPDATE review_reply SET comment = #{r.comment}, update_time = NOW(), review_reply_id = #{r.reviewReplyId}")
    int update(@Param("r") ReviewReplyDTO replyDTO);

    @Delete("DELETE FROM review_reply WHERE review_reply_id = #{r.reviewReplyId}")
    int delete(@Param("r") int replyId);

    @Delete("DELETE FROM review_reply WHERE board_id = #{r.boardId}")
    int deletedByBoardId(@Param("r") int boardId);

    @Results({
            @Result(column = "review_reply_id" , property = "reviewReplyId"),
            @Result(column = "category_id" , property = "categoryId"),
            @Result(column = "board_id" , property = "boardId"),
            @Result(column = "user_id" , property = "userId"),
            @Result(column = "comment" , property = "comment"),
            @Result(column = "create_time" , property = "createTime"),
            @Result(column = "update_time" , property = "updateTime"),
    })
    @Select("SELECT * FROM review_reply WHERE category_id = 1 AND board_id = #{boardId}")
    List<ReviewReplyDTO> selectAllByBoardId(int boardId);


















}
