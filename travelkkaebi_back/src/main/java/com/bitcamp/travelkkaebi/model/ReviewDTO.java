package com.bitcamp.travelkkaebi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;
import java.sql.Timestamp;

@Getter
@Setter
public class ReviewDTO {

    private int reviewId;
    private int categoryId;
    private int userId;
    private String title;
    private String content;
    private String region;
    private int likeCount;
    private int dislikeCount;
    private int view;
    private Timestamp createTime;
    private Timestamp updateTime;

}
