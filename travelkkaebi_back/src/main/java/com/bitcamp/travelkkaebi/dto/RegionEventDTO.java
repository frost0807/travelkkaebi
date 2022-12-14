package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.RegionalEventEntity;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegionEventDTO {
    private int regionId;
    private int userId;
    private int categoryId = 4;
    private String posterImageUrl;
    private String nickname;
    private String title;
    private String content;
    private int view;

    public RegionEventDTO(RegionalEventEntity regionalEventEntity) {
        this.regionId = regionalEventEntity.getId();
        this.categoryId = regionalEventEntity.getBaseWrite().getCategoryId();
        this.posterImageUrl = regionalEventEntity.getPosterImageUrl();
        this.title = regionalEventEntity.getBaseWrite().getTitle();
        this.content = regionalEventEntity.getBaseWrite().getContent();
        this.userId = regionalEventEntity.getUserEntity().getId();
        this.nickname = regionalEventEntity.getUserEntity().getNickname();
        this.view = regionalEventEntity.getBaseWrite().getView();
    }

    public static RegionEventDTO toDto(RegionalEventEntity regionalEventEntity) {
        return RegionEventDTO.builder()
                .regionId(regionalEventEntity.getId())
                .userId(regionalEventEntity.getId())
                .categoryId(regionalEventEntity.getBaseWrite().getCategoryId())
                .nickname(regionalEventEntity.getUserEntity().getNickname())
                .posterImageUrl(regionalEventEntity.getPosterImageUrl())
                .title(regionalEventEntity.getBaseWrite().getTitle())
                .content(regionalEventEntity.getBaseWrite().getContent())
                .view(regionalEventEntity.getBaseWrite().getView())
                .build();
    }

    public void setUserInfo(int userId, String nickname, String posterImageUrl) {
        this.userId = userId;
        this.nickname = nickname;
        this.posterImageUrl = posterImageUrl;
    }

    public void setPosterImageUrl(String posterImageUrl) {
        this.posterImageUrl = posterImageUrl;
    }

    public void setRegionId(int regionId) {
        this.regionId = regionId;
    }
}
