package com.bitcamp.travelkkaebi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class JoinMeService {
    /*
    private final JoinMeRepository joinMeRepository;
    private final JoinMeMapper joinMeMapper;

    public List<JoinMeDTO> selectAllByPage(int pageNo, int pageSize) throws Exception{
        try{
            HashMap<String, Integer> pageMap = new HashMap<>();
            int startNum = (pageNo-1)*pageSize;
            pageMap.put("startNum", startNum);
            pageMap.put("pageSize", pageSize);

            return joinMeRepository.selectAllByPage(pageMap);
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public JoinMeDTO selectOne(JoinMeDTO joinMeDTO) throws Exception{
            return joinMeMapper.selectOne(joinMeDTO);
    } */
}
