package com.bitcamp.travelkkaebi.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class EditorChoiceResponseDTO {

    private int editorChoiceId;
    private int userId;
    private int categoryId;

    private String nickname;
    private String profileImageUrl;
    private int mannerDegree;
    private String role;
    private String title;
    private String content;
    private int view;
    private int likeCount;
    private String region;
    private String editorImgUrl1;
    private String editorImgUrl2;
    private String editorImgUrl3;
    private Timestamp createTime;
    private Timestamp updateTime;
}
