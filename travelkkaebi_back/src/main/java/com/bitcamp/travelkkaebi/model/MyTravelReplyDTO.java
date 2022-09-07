package com.bitcamp.travelkkaebi.model;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class MyTravelReplyDTO {
    private int myTravelReplyId;
    private int myTravelId;
    private int userId;
    private String content;

    private Timestamp createTime;
    private Timestamp updateTime;
}
