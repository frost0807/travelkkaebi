package com.bitcamp.travelkkaebi.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
public class ReviewResponseDTO {

    private int reviewId;
    private int categoryId;
    private int userId;
    private String nickname;
    private String profile_image_url;
    private int manner_degree;
    private String title;
    private String content;
    private String region;
    private int likeCount;
    private int dislikeCount;
    private int view;
    private Timestamp createTime;
    private Timestamp updateTime;

}
