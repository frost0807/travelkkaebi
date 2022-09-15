package com.bitcamp.travelkkaebi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyTravelUserDTO {
    private int myTravelUserId;
    private int myTravelId;
    private int userId;

    private Timestamp createTime;
    private Timestamp updateTime;
}
