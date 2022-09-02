package com.bitcamp.travelkkaebi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaseWrite {

    @Column(name = "category_id")
    private int categoryId;
    private int view;
    private String content;
    private String title;

}
