package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.PickMeEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
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
    private LocalDateTime preferredStartDate;
    private LocalDateTime preferredEndDate;
    private boolean company = true;
    private boolean closed = true;


    public PickMeDTO(PickMeEntity pickMeEntity) {
        this.id = pickMeEntity.getId();
        this.userId = pickMeEntity.getUserEntity().getId();
        this.nickname = pickMeEntity.getUserEntity().getNickname();
        this.categoryId = pickMeEntity.getBaseWrite().getCategoryId();
        this.title = pickMeEntity.getBaseWrite().getTitle();
        this.content = pickMeEntity.getBaseWrite().getContent();
        this.preferredRegion = pickMeEntity.getRegion();
        this.preferredStartDate = pickMeEntity.getStartDate();
        this.preferredEndDate = pickMeEntity.getEndDate();
        this.company = pickMeEntity.isCompany();
        this.closed = pickMeEntity.isClosed();
    }

    public void setImageAndMannerDegreeAndUserId(String profileImageUrl, int mannerDegree, int userId) {
        this.userId = userId;
        this.mannerDegree = mannerDegree;
        this.profileImageUrl = profileImageUrl;
    }
}
