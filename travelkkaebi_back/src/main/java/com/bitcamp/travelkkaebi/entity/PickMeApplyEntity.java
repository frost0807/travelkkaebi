package com.bitcamp.travelkkaebi.entity;

import com.bitcamp.travelkkaebi.dto.PickMeApplyDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pick_me_apply")
public class PickMeApplyEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pick_me_apply_id")
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "board_id")
    private PickMeEntity pickMeEntity;

    private String comment;
    private boolean picked = false;

    public static PickMeApplyEntity toEntity(int userId, PickMeApplyDTO pickMeApplyDTO) {
        System.out.println(pickMeApplyDTO.getComment());
        return PickMeApplyEntity.builder()
                .userEntity(UserEntity.builder()
                        .id(userId)
                        .build())
                .pickMeEntity(PickMeEntity.builder()
                        .id(pickMeApplyDTO.getBoardId())
                        .build())
                .comment(pickMeApplyDTO.getComment())
                .build();
    }

}
