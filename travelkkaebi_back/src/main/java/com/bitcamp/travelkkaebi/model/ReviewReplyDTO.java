package com.bitcamp.travelkkaebi.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.Calendar;

@Getter
@Setter
@ToString
public class ReviewReplyDTO {

    private int ReviewReplyId;
    private int categoryId;
    private int boardId;
    private int userId;
    private String comment;
    private Calendar createTime;
    private Calendar updateTime;

}