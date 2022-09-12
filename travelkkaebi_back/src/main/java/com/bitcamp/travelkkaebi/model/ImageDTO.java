package com.bitcamp.travelkkaebi.model;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class ImageDTO {
    private int imageId;
    private int categoryId;
    private int boardId;
    private int userId;
    private String imageUrl;
}