package com.bitcamp.travelkkaebi.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class PageAndKeywordDTO {
    private int startNum;
    private int pageSize;
    private String keyword;
}
