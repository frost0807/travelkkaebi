package com.bitcamp.travelkkaebi.model;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class MyTravelUserDTO {
    private int myTravelUserId;
    private int myTravelId;
    private int userId;

    private Timestamp createTime;
    private Timestamp updateTime;
}
