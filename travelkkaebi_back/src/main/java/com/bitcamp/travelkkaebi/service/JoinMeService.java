package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.JoinMeListDTO;
import com.bitcamp.travelkkaebi.dto.JoinMeOneDTO;
import com.bitcamp.travelkkaebi.dto.PageAndKeywordDTO;
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

@RequiredArgsConstructor
@Service
public class JoinMeService {
    private final int PAGE_SIZE = 20;
    private final LikeOrDislikeService likeOrDislikeService;
    private final UserService userService;
    private final JoinMeMapper joinMeMapper;

    //전체보기 기준 페이지갯수 리턴
    public int getPageCount() throws Exception {
        return calculatePageCount(joinMeMapper.getPageCount());
    }

    //키워드보기 기준 페이지갯수 리턴
    public int getPageCountByKeyword(String keyword) {
        return calculatePageCount(joinMeMapper.getPageCountByKeyword(keyword));
    }

    public List<JoinMeListDTO> selectAllByPage(int pageNo) throws Exception {
        //기한에 따른 마감여부 갱신하고 list리턴
        return checkClosed(joinMeMapper.selectAllByPage(
                PageAndKeywordDTO.builder().startNum((pageNo - 1) * PAGE_SIZE).pageSize(PAGE_SIZE).build()));
    }

    public List<JoinMeListDTO> selectAllByPageAndKeyword(int pageNo, String keyword) throws Exception {
        return checkClosed(joinMeMapper.selectAllByPageAndKeyword(
                PageAndKeywordDTO.builder().startNum((pageNo - 1) * PAGE_SIZE).pageSize(PAGE_SIZE).keyword(keyword).build()));
    }

    //게시물 상세보기하면서 조회수+1
    public JoinMeOneDTO selectOne(int joinMeId) throws Exception {
        if (joinMeMapper.updateView(joinMeId) != 0) { //조회수+1 성공하면
            return joinMeMapper.selectOne(joinMeId);
        } else { //게시물이 존재하지 않으면
            return null;
        }
    }

    public JoinMeOneDTO insert(JoinMeDTO joinMeDTO, int userId) throws Exception {
        joinMeDTO.setUserId(userId);

        if (joinMeMapper.insert(joinMeDTO) != 0) { //insert가 성공했으면
            //useGenerateKeys에 의해 생성된 Id값으로 selectOne해서 리턴
            return joinMeMapper.selectOne(joinMeDTO.getJoinMeId());
        } else { //삽입 실패했으면
            return null;
        }
    }

    @Transactional
    public JoinMeOneDTO update(JoinMeDTO joinMeDTO, int userId) throws Exception {
        joinMeDTO.setUserId(userId);
        //update할 게시물의 id로 selectOne해와서 로그인한 userId와 비교하고
        //단축평가에 의해 true면 update수행 후 성공여부판별 후 객체리턴
        if (joinMeDTO.getUserId() == userId && joinMeMapper.update(joinMeDTO) != 0) {
            //useGenerateKeys에 의해 생성된 Id값으로 selectOne해서 리턴
            return selectOne(joinMeDTO.getJoinMeId());
        } else { //삽입 실패했으면
            return null;
        }
    }

    @Transactional
    public boolean delete(int joinMeId, int userId) throws Exception {
        if (joinMeMapper.selectOne(joinMeId).getUserId() == userId) {
            return (joinMeMapper.delete(joinMeId) != 0 ? true : false);
        } else {
            return false;
        }
    }

    //여행 끝나는날을 기준으로 글을 마감처리하는 메소드
    @Transactional
    public List<JoinMeListDTO> checkClosed(List<JoinMeListDTO> joinMeList) {
        for (int i = 0; i < joinMeList.size(); i++) {
            JoinMeListDTO joinMeListDTO = joinMeList.get(i);
            //여행 끝나는날이 현재시간기준 과거면
            if (joinMeListDTO.getEndDate().getTime() < System.currentTimeMillis()) {
                //글을 마감처리하고
                joinMeListDTO.setClosed(true);
                //마감처리된 글을 update
                joinMeMapper.updateClosed(joinMeListDTO);
            }
        }
        return joinMeList;
    }

    private int calculatePageCount(int boardCount) {
        if (boardCount % PAGE_SIZE != 0) {
            return boardCount / PAGE_SIZE + 1;
        } else {
            return boardCount / PAGE_SIZE;
        }
    }
}