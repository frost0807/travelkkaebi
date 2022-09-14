package com.bitcamp.travelkkaebi.dto.parameter;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PageAndJoinMeIdAndUserIdDTO {
    private int startNum;
    private int pageSize;
    private int joinMeId;
    private int userId;
}
