package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.DateInfo;
import com.bitcamp.travelkkaebi.entity.PickMeApplyEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ResponsePickMeDTO {
    private int pickMeApplyId;
    private int boardId;
    private int userId;
    private String nickname;
    private String profileImageUrl;
    private int categoryId;
    private String title;
    private String content;
    private String preferredRegion;
    private DateInfo dateInfo;
    private boolean company;
    private boolean closed;
    private boolean picked;

    public ResponsePickMeDTO(PickMeApplyEntity pickMeApplyEntity) {
        this.pickMeApplyId = pickMeApplyEntity.getId();
        this.boardId = pickMeApplyEntity.getPickMeEntity().getId();
        this.userId = pickMeApplyEntity.getUserEntity().getId();
        this.nickname = pickMeApplyEntity.getUserEntity().getNickname();
        this.categoryId = pickMeApplyEntity.getPickMeEntity().getWriteInfo().getCategoryId();
        this.profileImageUrl = pickMeApplyEntity.getUserEntity().getProfileImageUrl();
        this.title = pickMeApplyEntity.getPickMeEntity().getWriteInfo().getTitle();
        this.content = pickMeApplyEntity.getPickMeEntity().getWriteInfo().getContent();
        this.preferredRegion = pickMeApplyEntity.getPickMeEntity().getRegion();
        this.dateInfo = DateInfo.builder()
                .startDate(pickMeApplyEntity.getPickMeEntity().getDateInfo().getStartDate())
                .endDate(pickMeApplyEntity.getPickMeEntity().getDateInfo().getEndDate())
                .build();
        this.company = pickMeApplyEntity.getPickMeEntity().isCompany();
        this.closed = pickMeApplyEntity.getPickMeEntity().isClosed();
        this.picked = pickMeApplyEntity.isPicked();
    }
}
