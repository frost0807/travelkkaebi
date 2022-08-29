package com.bitcamp.travelkkaebi.model;

import lombok.*;

import java.sql.Timestamp;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
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
    private Timestamp createDate;
    private Timestamp updateDate;
}