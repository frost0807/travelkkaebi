package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.MannerDegreeResponseDTO;
import com.bitcamp.travelkkaebi.model.MannerDegreeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MannerDegreeMapper {
    Optional<MannerDegreeResponseDTO> selectOneByDTO(MannerDegreeDTO mannerDegreeDTO);
    Optional<MannerDegreeResponseDTO> selectOneById(int mannerDegreeId);
    int insert(MannerDegreeDTO mannerDegreeDTO);
    int update(MannerDegreeDTO mannerDegreeDTO);
    int getDegreePlus(int toUserId);
    int getDegreeMinus(int toUserId);
}