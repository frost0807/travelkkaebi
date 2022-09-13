package com.bitcamp.travelkkaebi.model;

import lombok.*;

import java.sql.Timestamp;
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
public class MyTravelDTO {
    private int myTravelId;
    private int joinMeId;
    private String title;
    private String content;
    private String region;
    private int memberCount;

    private Timestamp startDate;
    private Timestamp endDate;
    private Timestamp createTime;
    private Timestamp updateTime;
}