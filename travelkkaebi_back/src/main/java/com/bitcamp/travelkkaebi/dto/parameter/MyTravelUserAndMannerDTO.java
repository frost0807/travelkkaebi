package com.bitcamp.travelkkaebi.dto.parameter;

import com.bitcamp.travelkkaebi.dto.MyTravelUserResponseDTO;
import com.bitcamp.travelkkaebi.model.MannerDegreeDTO;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MyTravelUserAndMannerDTO {
    private MyTravelUserResponseDTO myTravelUserResponseDTO;
    private MannerDegreeDTO mannerDegreeDTO;
}
