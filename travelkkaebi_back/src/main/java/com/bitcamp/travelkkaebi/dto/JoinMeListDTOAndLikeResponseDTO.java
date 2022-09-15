package com.bitcamp.travelkkaebi.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class JoinMeListDTOAndLikeResponseDTO {
    private JoinMeListDTO joinMeListDTO;
    private LikeOrDislikeResponseDTO likeOrDislikeResponseDTO;
}
