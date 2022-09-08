package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.PickMeApplyDTO;
import com.bitcamp.travelkkaebi.entity.JoinMeEntity;
import com.bitcamp.travelkkaebi.entity.PickMeApplyEntity;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.repository.JoinMeRepository;
import com.bitcamp.travelkkaebi.repository.PickMeApplyRepository;
import com.bitcamp.travelkkaebi.repository.PickMeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static com.bitcamp.travelkkaebi.exception.ErrorCode.ALREADY_APPLIED;
import static com.bitcamp.travelkkaebi.exception.ErrorCode.DOES_NOT_EXIST_BOARD;

@Service
@RequiredArgsConstructor
public class PickMeApplyService {
    private final PickMeApplyRepository pickMeApplyDB;
    private final JoinMeRepository joinMeRepository;
    private final PickMeRepository pickMeDB;

    @Transactional
    public void pickUp(int userId, PickMeApplyDTO pickMeApplyDTO) {
        pickMeDB.findById(pickMeApplyDTO.getBoardId()).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));

        //joinMe 에 게시물이 등록되어있는지 check 하는 logic 게시물이 있더라도 그 게시물 유효한 게시물인지 체크
        List<JoinMeEntity> findJoinMeEntity = joinMeRepository.findAllByUserEntityIdAndDateInfoStartDateLessThan(userId, LocalDateTime.now());
        if (findJoinMeEntity.isEmpty())
            throw new KkaebiException(DOES_NOT_EXIST_BOARD);
        //이미 해당게시물을 pick 을 하였는지 check
        if (pickMeApplyDB.existsByUserEntityIdAndPickMeEntityId(userId, pickMeApplyDTO.getBoardId()))
            throw new KkaebiException(ALREADY_APPLIED);

        pickMeApplyDB.save(PickMeApplyEntity.toEntity(userId, pickMeApplyDTO));
    }

}