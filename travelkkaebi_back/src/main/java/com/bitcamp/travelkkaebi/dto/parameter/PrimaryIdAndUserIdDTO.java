package com.bitcamp.travelkkaebi.dto.parameter;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PrimaryIdAndUserIdDTO {
    private int primaryId;
    private int userId;
}
