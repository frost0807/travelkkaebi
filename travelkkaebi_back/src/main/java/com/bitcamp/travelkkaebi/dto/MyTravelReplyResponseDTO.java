package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.model.MyTravelReplyDTO;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class MyTravelReplyResponseDTO extends MyTravelReplyDTO {
    private String nickname;
    private String profileImageUrl;
}