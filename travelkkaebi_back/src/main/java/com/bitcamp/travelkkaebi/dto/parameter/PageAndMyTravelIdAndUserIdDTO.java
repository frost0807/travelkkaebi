package com.bitcamp.travelkkaebi.dto.parameter;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PageAndMyTravelIdAndUserIdDTO {
    private int startNum;
    private int pageSize;
    private int myTravelId;
    private int userId;
}
