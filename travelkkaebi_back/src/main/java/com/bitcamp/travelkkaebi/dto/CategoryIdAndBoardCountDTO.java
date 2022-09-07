package com.bitcamp.travelkkaebi.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CategoryIdAndBoardCountDTO {
    private int categoryId;
    private int boardCount;
}
