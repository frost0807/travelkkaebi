package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.RegionalEventEntity;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegionEventDTO {
    private int id;
    private int userId;
    private int categoryId;
    private String nickname;
    private String posterImageUrl;
    private int likeCount;
    private String title;
    private String content;
    private int view;

    public RegionEventDTO(RegionalEventEntity regionalEventEntity) {
        this.id = regionalEventEntity.getId();
        this.categoryId = regionalEventEntity.getCategoryId();
        this.posterImageUrl = regionalEventEntity.getPosterImageUrl();
        this.likeCount = regionalEventEntity.getLikeCount();
        this.title = regionalEventEntity.getTitle();
        this.content = regionalEventEntity.getContent();
        this.userId = regionalEventEntity.getUserEntity().getId();
        this.nickname = regionalEventEntity.getUserEntity().getNickname();
    }

    public static RegionEventDTO toDto(RegionalEventEntity regionalEventEntity) {
        return RegionEventDTO.builder()
                .id(regionalEventEntity.getId())
                .userId(regionalEventEntity.getId())
                .categoryId(regionalEventEntity.getCategoryId())
                .nickname(regionalEventEntity.getUserEntity().getNickname())
                .posterImageUrl(regionalEventEntity.getPosterImageUrl())
                .likeCount(regionalEventEntity.getLikeCount())
                .title(regionalEventEntity.getTitle())
                .content(regionalEventEntity.getContent())
                .view(regionalEventEntity.getView())
                .build();
    }

    public void setUserIdAndNicknameAndPosterImageUrl(int userId, String nickname, String posterImageUrl) {
        this.userId = userId;
        this.nickname = nickname;
        this.posterImageUrl = posterImageUrl;
    }

    public void setPosterImageUrl(String posterImageUrl) {
        this.posterImageUrl = posterImageUrl;
    }

    public void setId(int id) {
        this.id = id;
    }
}
