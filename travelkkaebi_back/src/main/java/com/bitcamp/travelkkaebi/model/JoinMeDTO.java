package com.bitcamp.travelkkaebi.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.sql.Timestamp;
import java.util.Calendar;

@Builder
@Setter
@Getter
public class JoinMeDTO {
    private int joinMeId;
    private int userId;
    private int categoryId;
    private int view;
    private String title;
    private String content;
    private String region;
    private int charge;
    private int capacity;
    private int likeCount;
    private boolean closed;

    private Timestamp startDate;
    private Timestamp endDate;
    private Timestamp createTime;
    private Timestamp updateTime;
}