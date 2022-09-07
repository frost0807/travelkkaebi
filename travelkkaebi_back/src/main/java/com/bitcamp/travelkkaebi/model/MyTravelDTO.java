package com.bitcamp.travelkkaebi.model;

import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class MyTravelDTO {
    private int myTravelId;
    private int joinMeId;

    private Timestamp createTime;
    private Timestamp updateTime;
}
