package com.bitcamp.travelkkaebi.entity;

import com.bitcamp.travelkkaebi.dto.PickMeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
                        .startDate(pickMeDTO.getPreferredStartDate())
                        .endDate(pickMeDTO.getPreferredEndDate()).build())
                .region(pickMeDTO.getPreferredRegion())
                .closed(pickMeDTO.isClosed())
                .company(pickMeDTO.isCompany())
                .build();
    }

    public void change(PickMeDTO pickMeDTO) {
        this.writeInfo.changeTitleAndContent(pickMeDTO.getTitle(), pickMeDTO.getContent());
        this.dateInfo.changeDate(pickMeDTO.getPreferredStartDate(), pickMeDTO.getPreferredEndDate());
    }

}
