package com.bitcamp.travelkkaebi.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListResponseDTO {
    private int totalPageCount;
    private List<?> list;
}
