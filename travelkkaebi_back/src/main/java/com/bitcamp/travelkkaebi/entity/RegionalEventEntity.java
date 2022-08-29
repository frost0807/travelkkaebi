package com.bitcamp.travelkkaebi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board_regional_event")
public class RegionalEventEntity extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "regional_event_id")
    private int id;

    @Column(name = "category_id")
    private int categoryId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "poster_image_url")
    private String posterImageUrl;

    @Column(name = "like_count")
    private int likeCount;

    private String title;
    private String content;

    l
}
