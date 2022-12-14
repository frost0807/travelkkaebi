package com.bitcamp.travelkkaebi.dto.parameter;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class PageAndUserIdDTO {
    private int startNum;
    private int pageSize;
    private int userId;
}