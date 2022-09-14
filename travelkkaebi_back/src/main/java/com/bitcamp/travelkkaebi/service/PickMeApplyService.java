package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.PickMeApplyDTO;
import com.bitcamp.travelkkaebi.dto.ResponsePickMeDTO;
import com.bitcamp.travelkkaebi.entity.JoinMeEntity;
import com.bitcamp.travelkkaebi.entity.PickMeApplyEntity;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.repository.JoinMeRepository;
import com.bitcamp.travelkkaebi.repository.PickMeApplyRepository;
import com.bitcamp.travelkkaebi.repository.PickMeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.bitcamp.travelkkaebi.exception.ErrorCode.ALREADY_APPLIED;
import static com.bitcamp.travelkkaebi.exception.ErrorCode.DOES_NOT_EXIST_BOARD;

@Service
@RequiredArgsConstructor
public class PickMeApplyService {
    private final PickMeApplyRepository pickMeApplyDB;
    private final JoinMeRepository joinMeDB;
    private final PickMeRepository pickMeDB;

    /**
     * write apply logic
     */
    @Transactional
    public void pickUp(int userId, PickMeApplyDTO pickMeApplyDTO) {
        pickMeDB.findById(pickMeApplyDTO.getBoardId()).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));
        //joinMe 에 게시물이 등록되어있는지 check 하는 logic 게시물이 있더라도 그 게시물 유효한 게시물인지 체크
        List<JoinMeEntity> findJoinMeEntity = joinMeDB.findAllByUserEntityIdAndDateInfoStartDateLessThan(userId, Timestamp.valueOf(LocalDateTime.now()));
        validate(findJoinMeEntity);
        //이미 해당게시물을 pick 을 하였는지 check
        if (pickMeApplyDB.existsByUserEntityIdAndPickMeEntityId(userId, pickMeApplyDTO.getBoardId()))
            throw new KkaebiException(ALREADY_APPLIED);

        pickMeApplyDB.save(PickMeApplyEntity.toEntity(userId, pickMeApplyDTO));
    }

    /**
     * 데려가줘 게시글에 지원한 리스트 logic
     */
    public ListResponseDTO showApplyList(int userId, Pageable pageable) {
        List<PickMeApplyEntity> myApplyList = pickMeApplyDB.findByUserEntityIdOrderByIdDesc(userId, pageable).getContent();
        validate(myApplyList);

        return ListResponseDTO.setTotalCountAndList(myApplyList.size(), myApplyList.stream().map(ResponsePickMeDTO::new).collect(Collectors.toList()));
    }

    /**
     * 나를 데려가고싶어하는 사람들 리스트 logic
     */
    public ListResponseDTO wantToTakeMeList(int userId, Pageable pageable) {
        List<PickMeApplyEntity> takeMeList = pickMeApplyDB.takeMeList(userId, pageable);
        validate(takeMeList);

        return ListResponseDTO.setTotalCountAndList(pickMeApplyDB.countByApply(userId), takeMeList.stream().map(ResponsePickMeDTO::new).collect(Collectors.toList()));
    }

    /**
     * 게시물 list 존재하는지 validate logic
     */
    private void validate(List<?> boardList) {
        if (boardList.isEmpty()) {
            throw new KkaebiException(DOES_NOT_EXIST_BOARD);
        }
    }

    /**
     * 채택 전 false -> beforeSelectList
     * 채택 후 true -> afterSelectList
     */
    public ListResponseDTO pickedStatusList(int userId, Pageable pageable, boolean picked) {
        List<PickMeApplyEntity> findList = pickMeApplyDB.takeMeList(userId, pageable);
        validate(findList);

        List<PickMeApplyEntity> beforeSelectList = new ArrayList<>();
        List<PickMeApplyEntity> afterSelectList = new ArrayList<>();

        for (PickMeApplyEntity pickMeApplyEntity : findList) {
            (!pickMeApplyEntity.isPicked() ? beforeSelectList : afterSelectList).add(pickMeApplyEntity);
        }

        return !picked ?
                ListResponseDTO.setTotalCountAndList(beforeSelectList.size(), beforeSelectList.stream().map(ResponsePickMeDTO::new).collect(Collectors.toList())) :
                ListResponseDTO.setTotalCountAndList(afterSelectList.size(), afterSelectList.stream().map(ResponsePickMeDTO::new).collect(Collectors.toList()));
    }

    /**
     * selected, cancel logic -> toggle 식으로
     */
    @Transactional
    public void selected(int userId, Pageable pageable, int pickMeApplyId) {
        List<PickMeApplyEntity> takeMeList = pickMeApplyDB.takeMeList(userId, pageable);
        validate(takeMeList);
        PickMeApplyEntity selectedApply = pickMeApplyDB.findById(pickMeApplyId).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));

        selectedApply.selected(!selectedApply.isPicked());
    }
}