package com.bitcamp.travelkkaebi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class ResponseDTO<T> {
    private String errorMessage;
    private List<T> responseList;
}