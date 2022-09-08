package com.bitcamp.travelkkaebi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class MyTravelDTO {
    private int myTravelId;
    private int joinMeId;

    private Timestamp createTime;
    private Timestamp updateTime;
}
