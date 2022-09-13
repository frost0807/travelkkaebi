package com.bitcamp.travelkkaebi.entity;

import com.bitcamp.travelkkaebi.dto.PickMeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board_pick_me")
public class PickMeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pick_me_id")
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Embedded
    private WriteInfo writeInfo;

    @OneToMany(mappedBy = "pickMeEntity")
    private List<PickMeApplyEntity> pickMeApplies = new ArrayList<>();

    @Column(name = "preferred_region")
    private String region;

    private boolean company;
    private boolean closed;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "startDate",
                    column = @Column(name = "preferred_start_date")),
            @AttributeOverride(name = "endDate",
                    column = @Column(name = "preferred_end_date"))
    })
    private DateInfo dateInfo;


    public static PickMeEntity toEntity(PickMeDTO pickMeDTO, int userId) {
        return PickMeEntity.builder()
                .region(pickMeDTO.getPreferredRegion())
                .closed(pickMeDTO.isClosed())
                .company(pickMeDTO.isCompany())
                .userEntity(UserEntity.builder()
                        .id(userId)
                        .build())
                .writeInfo(WriteInfo.builder()
                        .categoryId(pickMeDTO.getCategoryId())
                        .content(pickMeDTO.getContent())
                        .title(pickMeDTO.getTitle())
                        .view(pickMeDTO.getView())
                        .build())
                .dateInfo(DateInfo.builder()
                        .startDate(pickMeDTO.getDateInfo().getStartDate())
                        .endDate(pickMeDTO.getDateInfo().getEndDate())
                        .build())
                .build();
    }

    public void change(PickMeDTO pickMeDTO) {
        this.region = pickMeDTO.getPreferredRegion();
        this.writeInfo.changeTitleAndContent(pickMeDTO.getTitle(), pickMeDTO.getContent());
        this.dateInfo.changeDate(pickMeDTO.getDateInfo().getStartDate(), pickMeDTO.getDateInfo().getEndDate());
    }

    public void updateView(int view) {
        this.writeInfo.increaseView(view);
    }
}
