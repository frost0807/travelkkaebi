package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.MannerDegreeResponseDTO;
import com.bitcamp.travelkkaebi.mapper.MannerDegreeMapper;
import com.bitcamp.travelkkaebi.model.MannerDegreeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MannerDegreeService {
    private final int DEFAULT_MANNER_DEGREE = 37;
    private final MannerDegreeMapper mannerDegreeMapper;

    public MannerDegreeResponseDTO selectOne(int toUserId, int fromUserId) {
        MannerDegreeResponseDTO mannerDegreeResponseDTO
                = mannerDegreeMapper.selectOneByDTO(setMannerDegreeDTO(toUserId, fromUserId)).get();
        if(mannerDegreeResponseDTO==null){
            mannerDegreeResponseDTO = mannerDegreeMapper.selectOneById(insert(setMannerDegreeDTO(toUserId, fromUserId))).get();
        }

        return setMannerDegree(mannerDegreeResponseDTO);
    }

    //로그인유저의 해당유저에 대한 매너온도 상태가 존재하지 않을 때 삽입해주는 메소드
    public int insert(MannerDegreeDTO mannerDegreeDTO) {
        mannerDegreeMapper.insert(mannerDegreeDTO);

        return mannerDegreeDTO.getMannerDegreeId();
    }

    public MannerDegreeResponseDTO plusMannerDegree(int mannerDegreeId, int fromUserId) {
        MannerDegreeDTO mannerDegreeDTO = mannerDegreeMapper.selectOneById(mannerDegreeId)
                .orElseThrow(() -> new NullPointerException("해당 매너온도 상태가 존재하지 않습니다."));
        mannerDegreeDTO.setDegreeChange(1);
        mannerDegreeDTO.setFromUserId(fromUserId);

        return updateDegreeStatus(mannerDegreeDTO);
    }

    public MannerDegreeResponseDTO updateDegreeStatus(MannerDegreeDTO mannerDegreeDTO) {
        //상태 업데이트하고 성공했다면
        if (mannerDegreeMapper.update(mannerDegreeDTO) != 0) {
            //update 성공했으면 리턴
            MannerDegreeResponseDTO mannerDegreeResponseDTO =
                    mannerDegreeMapper.selectOneById(mannerDegreeDTO.getMannerDegreeId()).get();

            return setMannerDegree(mannerDegreeResponseDTO);
        } else {
            throw new RuntimeException("매너온도 상태 업데이트 실패");
        }
    }

    //매너온도를 DTO에 set해주는 메소드
    public MannerDegreeResponseDTO setMannerDegree(MannerDegreeResponseDTO mannerDegreeResponseDTO) {
        mannerDegreeResponseDTO.setMannerDegree(getMannerDegree(mannerDegreeResponseDTO.getToUserId()));

        return mannerDegreeResponseDTO;
    }

    //매너온도를 가져오는 메소드
    public int getMannerDegree(int toUserId) {
        int totalMannerDegree = DEFAULT_MANNER_DEGREE
                + mannerDegreeMapper.getDegreePlus(toUserId)
                + mannerDegreeMapper.getDegreeMinus(toUserId);

        return totalMannerDegree;
    }

    public MannerDegreeDTO setMannerDegreeDTO(int toUserId, int fromUserId) {
        return MannerDegreeDTO.builder()
                .toUserId(toUserId)
                .fromUserId(fromUserId)
                .build();
    }
}