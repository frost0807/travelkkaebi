package com.bitcamp.travelkkaebi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "board_join_me")
public class JoinMeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "join_me_id")
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Embedded
    private WriteInfo writeInfo;

    @Column(name = "current_member_count")
    private int currentMemberCount;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate",
                    column = @Column(name = "start_date")),
            @AttributeOverride(name = "endDate",
                    column = @Column(name = "end_date"))
    })
    private DateInfo dateInfo;

    private String region;
    private int capacity;
}
