package com.bitcamp.travelkkaebi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "board_join_me")
public class JoinMeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "join_me_id")
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Embedded
    private BaseWrite baseWrite;

    @Column(name = "current_member_count")
    private int currentMemberCount;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    private int charge;
    private String region;
    private int capacity;
}
