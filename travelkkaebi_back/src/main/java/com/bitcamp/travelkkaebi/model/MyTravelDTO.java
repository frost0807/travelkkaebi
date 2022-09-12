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

    private Timestamp createTime;
    private Timestamp updateTime;
}