package com.bitcamp.travelkkaebi.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Calendar;

@Getter
@Setter
public class TravelMapDTO {
    private int travelMapId;
    private int categoryId;
    private int boardId;
    private int userId;
    private String mapUrl;
}