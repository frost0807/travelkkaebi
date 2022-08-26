package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
import org.apache.ibatis.annotations.Mapper;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import com.bitcamp.travelkkaebi.model.ReviewReplyDTO;
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

    @Select("SELECT review_reply_id, category_id, board_id, user_id, comment, create_time, update_time FROM review_reply" +
            "WHERE category_id = #{r.categoryId}, board_id = #{r.boardId}")
    List<ReviewReplyDTO> selectAllByBoardId(@Param("r") ReviewDTO reviewDTO);

}
