package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.RegionalEventEntity;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegionEventDTO {
    private int id = 0;
    private int userId;
    private int categoryId;
    private String nickname;
    private String posterImageUrl;
    private int likeCount;
    private String title;
    private String content;

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
}
