package com.bitcamp.travelkkaebi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;

@Setter
@Getter
public class ImageDTO {
    private int imageId;
    private int categoryId;
    private int boardId;
    private int userId;
    private String imageUrl;
}