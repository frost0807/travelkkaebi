package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.DateInfo;
import com.bitcamp.travelkkaebi.entity.PickMeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PickMeDTO {
    private int boardId;
    private int userId;
    private int categoryId = 2;
    private int mannerDegree;
    private String profileImageUrl;
    private String nickname;
    private int view = 0;
    private String title;
    private String content;
    private String preferredRegion;
    private boolean company = false;
    private boolean closed = false;
    private DateInfo dateInfo;

    public PickMeDTO(PickMeEntity pickMeEntity) {
        this.boardId = pickMeEntity.getId();
        this.userId = pickMeEntity.getUserEntity().getId();
        this.nickname = pickMeEntity.getUserEntity().getNickname();
        this.categoryId = pickMeEntity.getWriteInfo().getCategoryId();
        this.profileImageUrl = pickMeEntity.getUserEntity().getProfileImageUrl();
        this.title = pickMeEntity.getWriteInfo().getTitle();
        this.content = pickMeEntity.getWriteInfo().getContent();
        this.preferredRegion = pickMeEntity.getRegion();
        this.dateInfo = DateInfo.builder()
                .startDate(pickMeEntity.getDateInfo().getStartDate())
                .endDate(pickMeEntity.getDateInfo().getEndDate())
                .build();
        this.company = pickMeEntity.isCompany();
        this.closed = pickMeEntity.isClosed();
    }

    public void setUserInfo(String profileImageUrl, int mannerDegree, int userId, int id, String nickname) {
        this.userId = userId;
        this.mannerDegree = mannerDegree;
        this.profileImageUrl = profileImageUrl;
        this.boardId = id;
        this.nickname = nickname;
    }

    public static PickMeDTO toDto(PickMeEntity findPickMe) {
        return PickMeDTO.builder()
                .boardId(findPickMe.getId())
                .userId(findPickMe.getUserEntity().getId())
                .mannerDegree(findPickMe.getUserEntity().getMannerDegree())
                .nickname(findPickMe.getUserEntity().getNickname())
                .profileImageUrl(findPickMe.getUserEntity().getProfileImageUrl())
                .preferredRegion(findPickMe.getRegion())
                .content(findPickMe.getWriteInfo().getContent())
                .title(findPickMe.getWriteInfo().getTitle())
                .view(findPickMe.getWriteInfo().getView())
                .categoryId(findPickMe.getWriteInfo().getCategoryId())
                .dateInfo(DateInfo.builder()
                        .startDate(findPickMe.getDateInfo().getStartDate())
                        .endDate(findPickMe.getDateInfo().getEndDate())
                        .build())
                .build();
    }

}
