package com.bitcamp.travelkkaebi.dto.parameter;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyTravelIdAndUserIdDTO {
    private int myTravelId;
    private int userId;
}