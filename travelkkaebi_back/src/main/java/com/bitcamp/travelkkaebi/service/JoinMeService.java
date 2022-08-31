package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.JoinMeMapper;
import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class JoinMeService {
    private final int PAGE_SIZE = 20;
    private final LikeOrDislikeService likeOrDislikeService;
    private final JoinMeMapper joinMeMapper;

    public int getPageCount() throws Exception{
        int boardCount = joinMeMapper.getCount();

        if(boardCount%PAGE_SIZE!=0){
            return boardCount/PAGE_SIZE+1;
        } else{
            return boardCount/PAGE_SIZE;
        }
    }

    public List<JoinMeDTO> selectAllByPage(int pageNo) throws Exception {

        HashMap<String, Integer> pageMap = new HashMap<>();
        int startNum = (pageNo-1)*PAGE_SIZE;
        pageMap.put("startNum", startNum);
        pageMap.put("pageSize", PAGE_SIZE);
        //기한에 따른 마감여부 갱신하고 list리턴
        return checkClosed(joinMeMapper.selectAllByPage(pageMap));
    }

    //게시물 상세보기하면서 조회수+1, like_count갱신
    public JoinMeDTO selectOne(int joinMeId) throws Exception {
        JoinMeDTO joinMeDTO = joinMeMapper.selectOne(joinMeId);
        System.out.println(joinMeDTO.getStartDate().getTime());
        joinMeDTO.setLikeCount(likeOrDislikeService.getCount(
                LikeOrDislikeDTO.builder()
                        .categoryId(joinMeDTO.getCategoryId())
                        .boardId(joinMeDTO.getJoinMeId())
                        .build())
                .get("like"));
        if(joinMeMapper.updateSelectOne(joinMeDTO)!=0){ //조회수+1, like_count 갱신 성공하면
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

    @Transactional
    public JoinMeDTO update(JoinMeDTO joinMeDTO, int userId) throws Exception{
        joinMeDTO.setUserId(userId);
        //update할 게시물의 id로 selectOne해와서 로그인한 userId와 비교하고
        //단축평가에 의해 true면 update수행 후 성공여부판별 후 객체리턴
        if(joinMeMapper.selectOne(joinMeDTO.getJoinMeId()).getUserId()==userId
                &&joinMeMapper.update(joinMeDTO)!=0){
            //useGenerateKeys에 의해 생성된 Id값으로 selectOne해서 리턴
            return selectOne(joinMeDTO.getJoinMeId());
        } else{ //삽입 실패했으면
            return null;
        }
    }

    @Transactional
    public boolean delete(int joinMeId, int userId) throws Exception{
        if(joinMeMapper.selectOne(joinMeId).getUserId()==userId){
            return (joinMeMapper.delete(joinMeId)!=0 ? true : false);
        } else{
            return false;
        }
    }

    //여행 끝나는날을 기준으로 글을 마감처리하는 메소드
    private List<JoinMeDTO> checkClosed(List<JoinMeDTO> joinMeDTOList){
        ArrayList<JoinMeDTO> resultList = new ArrayList<>();

        for(JoinMeDTO joinMeDTO : joinMeDTOList){
            if(joinMeDTO.getEndDate().getTime()>=System.currentTimeMillis()){
                //기한이 됐다면 closed를 true로 갱신하고
                joinMeMapper.updateClosed(joinMeDTO);
                resultList.add(joinMeMapper.selectOne(joinMeDTO.getJoinMeId()));
            } else{
                resultList.add(joinMeDTO);
            }
        }
        return resultList;
    }
}