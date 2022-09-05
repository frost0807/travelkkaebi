package com.bitcamp.travelkkaebi.entity;

import com.bitcamp.travelkkaebi.dto.PickMeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PickMeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pick_me_id")
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Embedded
    private BaseWrite baseWrite;

    private boolean company;
    private boolean closed;
    private String region;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public static PickMeEntity toEntity(PickMeDTO pickMeDTO, int userId) {
        return PickMeEntity.builder()
                .userEntity(UserEntity.builder()
                        .id(userId)
                        .build())
                .baseWrite(BaseWrite.builder()
                        .categoryId(pickMeDTO.getCategoryId())
                        .content(pickMeDTO.getContent())
                        .title(pickMeDTO.getTitle())
                        .view(pickMeDTO.getView())
                        .build())
                .startDate(pickMeDTO.getPreferredStartDate())
                .endDate(pickMeDTO.getPreferredEndDate())
                .closed(pickMeDTO.isClosed())
                .company(pickMeDTO.isCompany())
                .build();
    }
}
