package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.*;
import com.bitcamp.travelkkaebi.mapper.MyTravelMapper;
import com.bitcamp.travelkkaebi.mapper.MyTravelUserMapper;
import com.bitcamp.travelkkaebi.model.MyTravelDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MyTravelService {
    private final int PAGE_SIZE = 15;
    private final JoinMeService joinMeService;
    private final MyTravelUserService myTravelUserService;
    private final MyTravelMapper myTravelMapper;

    public ListResponseDTO selectAllByPage(int pageNo, int userId) {
        PageAndUserIdDTO pageAndUserIdDTO = setPageAndUserIdDTO(pageNo, userId);
        return setListResponse(myTravelMapper.count(pageAndUserIdDTO), myTravelMapper.selectAllByPage(pageAndUserIdDTO));
    }

    public MyTravelResponseDTO selectOne(int myTravelId, int userId) {
        return myTravelMapper.selectOne(setPrimaryIdAndUserIdDTO(myTravelId, userId));
    }

    @Transactional
    public boolean insert(int joinMeId) throws Exception {
        MyTravelDTO myTravelDTO = setMyTravelDTO(joinMeService.selectOne(joinMeId));
        //myTravel 삽입성공하면
        if (myTravelMapper.insert(myTravelDTO) == 1) {
            //삽입된 myTravelId 리턴
            int myTravelId = myTravelDTO.getMyTravelId();
            int successCount = 0;
            List<Integer> userList = joinMeService.getAppliedAndWriterList(joinMeId);
            //userList에 있는 userId들을 MyTravelUser테이블에 삽입
            for (int userId : userList) {
                successCount += myTravelUserService.insert(myTravelId, userId);
            }
            //모두 다 성공했는지 여부 리턴
            return (successCount == userList.size());
        } else {
            throw new RuntimeException("myTravel게시물 삽입 실패");
        }
    }

    //응답객체에 게시물리스트와 총페이지수 세팅해주는 메소드
    public ListResponseDTO setListResponse(int totalPageCount, List<MyTravelResponseDTO> myTravelResponseDTOList) {
        return ListResponseDTO.builder()
                .totalBoardCount(totalPageCount)
                .list(myTravelResponseDTOList)
                .build();
    }

    public MyTravelDTO setMyTravelDTO(JoinMeOneDTO joinMeOneDTO) {
        return MyTravelDTO.builder()
                .joinMeId(joinMeOneDTO.getJoinMeId())
                .title(joinMeOneDTO.getTitle())
                .content(joinMeOneDTO.getContent())
                .region(joinMeOneDTO.getRegion())
                .memberCount(joinMeOneDTO.getCurrentMemberCount())
                .startDate(joinMeOneDTO.getStartDate())
                .endDate(joinMeOneDTO.getEndDate())
                .build();
    }

    public PageAndUserIdDTO setPageAndUserIdDTO(int pageNo, int userId) {
        return PageAndUserIdDTO.builder()
                .startNum((pageNo - 1) * PAGE_SIZE)
                .pageSize(PAGE_SIZE)
                .userId(userId)
                .build();
    }

    public PrimaryIdAndUserIdDTO setPrimaryIdAndUserIdDTO(int myTravelId, int userId){
        return PrimaryIdAndUserIdDTO.builder()
                .primaryId(myTravelId)
                .userId(userId)
                .build();
    }
}