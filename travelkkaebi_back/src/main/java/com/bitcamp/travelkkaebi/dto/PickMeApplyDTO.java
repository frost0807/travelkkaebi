package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.PickMeApplyEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PickMeApplyDTO {
    private int boardId;
    private String comment;

    public PickMeApplyDTO(PickMeApplyEntity pickMeApplyEntity) {
        this.boardId = pickMeApplyEntity.getId();
        this.comment = pickMeApplyEntity.getComment();
    }
}