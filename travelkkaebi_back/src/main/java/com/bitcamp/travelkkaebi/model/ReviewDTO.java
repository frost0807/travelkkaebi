package com.bitcamp.travelkkaebi.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
public class ReviewDTO {

    private int reviewId;
    private int categoryId;
    private int userId;
    private String title;
    private String content;
    private String region;
    private int view;
    private String profileImageUrl;
    private String reviewImgUrl;
    private Timestamp createTime;
    private Timestamp updateTime;

}
