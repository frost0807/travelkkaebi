package com.bitcamp.travelkkaebi.model;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MannerDegreeDTO {
    private int mannerDegreeId;
    private int fromUserId;
    private int toUserId;
    private int degreeChange;
}
