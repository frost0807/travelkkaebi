package com.bitcamp.travelkkaebi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;

@Getter
@Setter
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

    private Calendar startDate;
    private Calendar endDate;
    private Calendar createDate;
    private Calendar updateDate;
}