package com.bitcamp.travelkkaebi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PickMeApplyEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pick_me_apply_id")
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "board_id")
    private int boardId;

    private String comment;
    private boolean picked;

}
