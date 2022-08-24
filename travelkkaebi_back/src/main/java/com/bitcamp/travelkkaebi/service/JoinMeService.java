package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.JoinMeMapper;
import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class JoinMeService {
    private final JoinMeMapper joinMeMapper;

    public List<JoinMeDTO> selectAllByPage(int pageNo, int pageSize) throws Exception {
        HashMap<String, Integer> pageMap = new HashMap<>();
        int startNum = (pageNo-1)*pageSize;
        pageMap.put("startNum", startNum);
        pageMap.put("pageSize", pageSize);

        return joinMeMapper.selectAllByPage(pageMap);
    }

    public JoinMeDTO selectOne(JoinMeDTO joinMeDTO) throws Exception {
        return joinMeMapper.selectOne(joinMeDTO);
    }

    public int insert(JoinMeDTO joinMeDTO, int userId) throws Exception {
        if(joinMeDTO.getUserId()==userId){
            return joinMeMapper.insert(joinMeDTO);
        } else{
            return 0;
        }
    }

    public int update(JoinMeDTO joinMeDTO, int userId) throws Exception{
        if(joinMeDTO.getUserId()==userId){
            return joinMeMapper.update(joinMeDTO);
        } else{
            return 0;
        }
    }

    public int delete(JoinMeDTO joinMeDTO, int userId) throws Exception{
        if(joinMeDTO.getUserId()==userId){
            return joinMeMapper.delete(joinMeDTO);
        } else{
            return 0;
        }
    }
}
