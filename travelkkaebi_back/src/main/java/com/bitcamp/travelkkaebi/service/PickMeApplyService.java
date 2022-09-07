package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.PickMeApplyDTO;
import com.bitcamp.travelkkaebi.entity.JoinMeEntity;
import com.bitcamp.travelkkaebi.entity.PickMeApplyEntity;
import com.bitcamp.travelkkaebi.repository.JoinMeRepository;
import com.bitcamp.travelkkaebi.repository.PickMeApplyRepository;
import com.bitcamp.travelkkaebi.repository.PickMeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PickMeApplyService {
    private final PickMeApplyRepository pickMeApplyRepository;
    private final JoinMeRepository joinMeRepository;
    private final PickMeRepository pickMeRepository;

    @Transactional
    public void pickUp(int userId, PickMeApplyDTO pickMeApplyDTO) {
        pickMeRepository.findById(pickMeApplyDTO.getBoardId()).orElseThrow(() -> new RuntimeException("데려가줘 게시물이 존재하지 않습니다."));

        //joinMe 에 게시물이 등록되어있는지 check 하는 logic 게시물이 있더라도 그 게시물 유효한 게시물인지 체크
        List<JoinMeEntity> findJoinMeEntity = joinMeRepository.findAllByUserEntityIdAndDateInfoStartDateLessThan(userId, LocalDateTime.now());
        if (findJoinMeEntity.isEmpty())
            throw new RuntimeException("같이 여행가요 게시물이 존재하지 않으므로 픽업을 할 수 없습니다.");
        //이미 해당게시물을 pick 을 하였는지 check
        if (pickMeApplyRepository.existsByUserEntityIdAndPickMeEntityId(userId, pickMeApplyDTO.getBoardId()))
            throw new RuntimeException("해당 게시물에 이미 신청을 하였습니다.");

        pickMeApplyRepository.save(PickMeApplyEntity.toEntity(userId, pickMeApplyDTO));
    }

}