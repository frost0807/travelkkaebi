package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.PickMeEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PickMeDTO {
    private int id;
    private int userId;
    private int categoryId = 2;
    private int view = 0;
    private int mannerDegree;
    private String profileImageUrl;
    private String nickname;
    private String title;
    private String content;
    private String preferredRegion;
    private boolean company = false;
    private boolean closed = false;

    private LocalDateTime preferredStartDate;
    private LocalDateTime preferredEndDate;

    public PickMeDTO(PickMeEntity pickMeEntity) {
        this.id = pickMeEntity.getId();
        this.userId = pickMeEntity.getUserEntity().getId();
        this.nickname = pickMeEntity.getUserEntity().getNickname();
        this.categoryId = pickMeEntity.getBaseWrite().getCategoryId();
        this.profileImageUrl = pickMeEntity.getUserEntity().getProfileImageUrl();
        this.title = pickMeEntity.getBaseWrite().getTitle();
        this.content = pickMeEntity.getBaseWrite().getContent();
        this.preferredRegion = pickMeEntity.getRegion();
        this.preferredStartDate = pickMeEntity.getStartDate();
        this.preferredEndDate = pickMeEntity.getEndDate();
        this.company = pickMeEntity.isCompany();
        this.closed = pickMeEntity.isClosed();
    }

    public void setUserInfo(String profileImageUrl, int mannerDegree, int userId, int id, String nickname) {
        this.userId = userId;
        this.mannerDegree = mannerDegree;
        this.profileImageUrl = profileImageUrl;
        this.id = id;
        this.nickname = nickname;
    }

    public static PickMeDTO toDto(PickMeEntity findPickMe) {
        return PickMeDTO.builder()
                .mannerDegree(findPickMe.getUserEntity().getMannerDegree())
                .nickname(findPickMe.getUserEntity().getNickname())
                .preferredRegion(findPickMe.getRegion())
                .preferredStartDate(findPickMe.getStartDate())
                .preferredEndDate(findPickMe.getEndDate())
                .content(findPickMe.getBaseWrite().getContent())
                .title(findPickMe.getBaseWrite().getTitle())
                .view(findPickMe.getBaseWrite().getView())
                .categoryId(findPickMe.getBaseWrite().getCategoryId())
                .build();
    }

}
