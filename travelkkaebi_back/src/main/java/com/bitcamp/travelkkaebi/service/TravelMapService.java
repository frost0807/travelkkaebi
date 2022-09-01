package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.TravelMapMapper;
import com.bitcamp.travelkkaebi.model.TravelMapDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TravelMapService {
    private final TravelMapMapper travelMapMapper;

    public List<TravelMapDTO> selectAll(TravelMapDTO travelMapDTO) throws Exception{
        return travelMapMapper.selectAll(travelMapDTO);
    }

    public TravelMapDTO insert(TravelMapDTO travelMapDTO, int userId) throws Exception{
        travelMapDTO.setUserId(userId);
        travelMapMapper.insert(travelMapDTO);

        return travelMapMapper.selectOne(travelMapDTO.getTravelMapId());
    }

    public TravelMapDTO update(TravelMapDTO travelMapDTO, int userId) throws Exception{
        if(travelMapMapper.selectOne(travelMapDTO.getTravelMapId()).getUserId()==userId
                &&travelMapMapper.update(travelMapDTO)!=0){
            return travelMapMapper.selectOne(travelMapDTO.getTravelMapId());
        } else{
            return null;
        }
    }

    public int delete(int travelMapId, int userId) throws Exception{
        if(travelMapMapper.selectOne(travelMapId).getUserId()==userId){
            return travelMapMapper.delete(travelMapId);
        } else{
            return 0;
        }
    }
}
