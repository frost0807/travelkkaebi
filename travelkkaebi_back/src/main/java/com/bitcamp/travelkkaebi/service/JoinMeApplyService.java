package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.*;
import com.bitcamp.travelkkaebi.mapper.JoinMeApplyMapper;
import com.bitcamp.travelkkaebi.mapper.JoinMeMapper;
import com.bitcamp.travelkkaebi.model.JoinMeApplyDTO;
import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JoinMeApplyService {
    private final int PAGE_SIZE = 10;
    private final JoinMeApplyMapper joinMeApplyMapper;
    private final JoinMeMapper joinMeMapper;

    public boolean insert(JoinMeApplyDTO joinMeApplyDTO, int userId) throws Exception {
        joinMeApplyDTO.setUserId(userId);
        //해당 신청서의 게시물 가져오기
        JoinMeOneDTO joinMeOneDTO = joinMeMapper.selectOne(joinMeApplyDTO.getJoinMeId())
                .orElseThrow(() -> new NullPointerException("게시물이 존재하지 않음"));
        //게시물의 신청가능 인원이 가득 찼는지 검사
        if (joinMeOneDTO.getCapacity() > joinMeOneDTO.getCurrentMemberCount()) {
            return joinMeApplyMapper.insert(joinMeApplyDTO) == 1 ? true : false;
        } else {
            throw new RuntimeException("신청가능인원이 가득참");
        }
    }

    //로그인한 유저가 신청한 신청서들
    public ListResponseDTO selectAllByUserId(int pageNo, int userId) throws Exception {
        int totalPageCount = calculatePageCount(joinMeApplyMapper.getBoardCountByUserId(userId));
        List<JoinMeApplyResponseDTO> joinMeApplyResponseDTOList
                = joinMeApplyMapper.selectAllByUserId(setPageAndUserId(pageNo, userId));

        return setListResponse(totalPageCount, joinMeApplyResponseDTOList);
    }

    //로그인한 유저의 같이가요 글에 신청한 신청서들
    public ListResponseDTO selectAllByWriterId(int pageNo, int userId) throws Exception {
        int totalPageCount = calculatePageCount(joinMeApplyMapper.getBoardCountByWriterId(userId));
        List<JoinMeApplyResponseDTO> joinMeApplyResponseDTOList
                = joinMeApplyMapper.selectAllByWriterId(setPageAndUserId(pageNo, userId));
        return setListResponse(totalPageCount, joinMeApplyResponseDTOList);
    }

    public JoinMeApplyResponseDTO selectOne(int joinMeApplyId) throws Exception {
        return joinMeApplyMapper.selectOne(joinMeApplyId)
                .orElseThrow(() -> new NullPointerException("해당 신청서가 존재하지 않음"));
    }

    public boolean setSelectedTrue(int joinMeApplyId, int userId) throws Exception{
        joinMeApplyMapper.checkValidUser(PrimaryIdAndUserIdDTO.builder()
                        .primaryId(joinMeApplyId)
                        .userId(userId)
                        .build())
                .orElseThrow(() -> new NullPointerException("신청서의 대상이 로그인한 유저가 아닙니다."));
        return (joinMeApplyMapper.updateSelectedTrue(joinMeApplyId) == 1 ? true : false);
    }

    //페이지와 userId를 객체에 세팅해주는 메소드
    public PageAndUserIdDTO setPageAndUserId(int pageNo, int userId) {
        return PageAndUserIdDTO.builder()
                .startNum((pageNo - 1) * PAGE_SIZE)
                .pageSize(PAGE_SIZE)
                .userId(userId)
                .build();
    }

    //응답객체에 게시물리스트와 총페이지수 세팅해주는 메소드
    public ListResponseDTO setListResponse(int totalPageCount, List<JoinMeApplyResponseDTO> joinMeApplyResponseDTOList) {
        return ListResponseDTO.builder()
                .totalPageCount(totalPageCount)
                .list(joinMeApplyResponseDTOList)
                .build();
    }

    //페이지수 계산해주는 메소드
    private int calculatePageCount(int boardCount) {
        if (boardCount % PAGE_SIZE != 0) {
            return boardCount / PAGE_SIZE + 1;
        } else {
            return boardCount / PAGE_SIZE;
        }
    }
}