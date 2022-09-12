package com.bitcamp.travelkkaebi.model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class EditorChoiceDTO {

    private int editorChoiceId;
    private int userId;
    private int categoryId;
    private String title;
    private String content;
    private int view;
    private String region;
    private String editorImgUrl1;
    private String editorImgUrl2;
    private String editorImgUrl3;
    private Timestamp createTime;
    private Timestamp updateTime;
}
