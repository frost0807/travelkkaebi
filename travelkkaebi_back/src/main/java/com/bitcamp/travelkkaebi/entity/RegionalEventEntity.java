package com.bitcamp.travelkkaebi.entity;

import com.bitcamp.travelkkaebi.dto.RegionEventDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "board_regional_event")
public class RegionalEventEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regional_event_id")
    private int id;

    @Column(name = "category_id", nullable = false)
    private int categoryId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity userEntity;

    @Column(name = "poster_image_url")
    private String posterImageUrl;

    @Column(name = "like_count")
    private int likeCount;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    private int view;

    public static RegionalEventEntity toEntity(RegionEventDTO regionEventDTO) {
        return RegionalEventEntity.builder()
                .userEntity(UserEntity.builder()
                        .id(regionEventDTO.getUserId())
                        .nickname(regionEventDTO.getNickname())
                        .build())
                .categoryId(regionEventDTO.getCategoryId())
                .content(regionEventDTO.getContent())
                .posterImageUrl(regionEventDTO.getPosterImageUrl())
                .likeCount(regionEventDTO.getLikeCount())
                .content(regionEventDTO.getContent())
                .title(regionEventDTO.getTitle())
                .build();
    }

    public void change(RegionEventDTO regionEventDTO) {
        this.content = regionEventDTO.getContent();
        this.title = regionEventDTO.getTitle();
        this.posterImageUrl = regionEventDTO.getPosterImageUrl();
    }

    public void updateView(int view) {
        this.view = view + 1;
    }
}
