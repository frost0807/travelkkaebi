package com.bitcamp.travelkkaebi.dto.parameter;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class JoinMeIdAndUserIdDTO {
    private int joinMeId;
    private int userId;
}
