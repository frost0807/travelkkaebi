package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.JoinMeMapper;
import com.bitcamp.travelkkaebi.mapper.LikeOrDislikeMapper;
import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class JoinMeService {
    private final int PAGE_SIZE = 20;
    
    private final JoinMeMapper joinMeMapper;

    public List<JoinMeDTO> selectAllByPage(int pageNo) throws Exception {

        HashMap<String, Integer> pageMap = new HashMap<>();
        int startNum = (pageNo-1)*PAGE_SIZE;
        pageMap.put("startNum", startNum);
        pageMap.put("pageSize", PAGE_SIZE);

        return joinMeMapper.selectAllByPage(pageMap);
    }

    //게시물 상세보기하면서 조회수+1
    public JoinMeDTO selectOne(int joinMeId) throws Exception {
        if(joinMeMapper.viewPlus(joinMeId)!=0){ //해당 게시물의 조회수+1에 성공하면
            return joinMeMapper.selectOne(joinMeId);
        } else{ //게시물이 존재하지 않으면
            return null;
        }
    }

    public JoinMeDTO insert(JoinMeDTO joinMeDTO, int userId) throws Exception {
        joinMeDTO.setUserId(userId);

        if(joinMeMapper.insert(joinMeDTO)!=0){ //insert가 성공했으면
            //useGenerateKeys에 의해 생성된 Id값으로 selectOne해서 리턴
            return joinMeMapper.selectOne(joinMeDTO.getJoinMeId());
        } else{ //삽입 실패했으면
            return null;
        }
    }

    public JoinMeDTO update(JoinMeDTO joinMeDTO, int userId) throws Exception{
        joinMeDTO.setUserId(userId);
        //update할 게시물의 id로 selectOne해와서 로그인한 userId와 비교하고
        //단축평가에 의해 true이면 update수행 후 성공여부판별 후 객체리턴
        if(joinMeMapper.selectOne(joinMeDTO.getJoinMeId()).getUserId()==userId
                &&joinMeMapper.update(joinMeDTO)!=0){
            //useGenerateKeys에 의해 생성된 Id값으로 selectOne해서 리턴
            return joinMeMapper.selectOne(joinMeDTO.getJoinMeId());
        } else{ //삽입 실패했으면
            return null;
        }
    }

    public boolean delete(int joinMeId, int userId) throws Exception{
        if(joinMeMapper.selectOne(joinMeId).getUserId()==userId){
            return (joinMeMapper.delete(joinMeId)!=0 ? true : false);
        } else{
            return false;
        }
    }
}
