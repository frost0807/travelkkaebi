package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import com.bitcamp.travelkkaebi.repository.JoinMeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Service
public class JoinMeService {
    private final JoinMeRepository joinMeRepository;

    public List<JoinMeDTO> selectAllByPage(int pageNo, int pageSize){
        try{
            HashMap<String, Integer> pageMap = new HashMap<>();
            int startNum = (pageNo-1)*pageSize;
            pageMap.put("startNum", startNum);
            pageMap.put("pageSize", pageSize);

            return joinMeRepository.selectAllByPage(pageMap);
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
