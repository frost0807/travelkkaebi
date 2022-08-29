package com.bitcamp.travelkkaebi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegionEventDTO {

    private int id;
    private int userId;
    private int categoryId;
    private String posterImageUrl;
    private int likeCount;
    private String title;
    private String content;

}
