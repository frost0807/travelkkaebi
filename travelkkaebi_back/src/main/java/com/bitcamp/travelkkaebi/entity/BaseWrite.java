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

    @Column(name = "category_id", nullable = false)
    private int categoryId;

    @Column(nullable = false)
    private int view;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String title;

    public BaseWrite(String content, String title) {
        this.content = content;
        this.title = title;
    }

    public BaseWrite(int view) {
        this.view = view + 1;
    }


}
