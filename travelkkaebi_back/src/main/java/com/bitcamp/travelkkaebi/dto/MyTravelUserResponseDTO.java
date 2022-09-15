package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.model.MyTravelUserDTO;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MyTravelUserResponseDTO extends MyTravelUserDTO {
    private String nickname;
    private String profileImageUrl;
    private int mannerDegree;
}
