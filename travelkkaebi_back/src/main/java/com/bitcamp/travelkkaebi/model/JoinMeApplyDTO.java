package com.bitcamp.travelkkaebi.model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class JoinMeApplyDTO {
    private int pickMeApplyId;
    private int categoryId;
    private int boardId;
    private int userId;
    private String comment;
    private boolean picked;

    private Timestamp createTime;
    private Timestamp updateTime;
}
