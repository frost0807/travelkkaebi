package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.RegionEventDTO;
import com.bitcamp.travelkkaebi.entity.RegionalEventEntity;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.entity.UserRole;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.repository.RegionEventRepository;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static com.bitcamp.travelkkaebi.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class RegionEventService {

    private final RegionEventRepository regionDB;
    private final UserRepository userDB;

    /**
     * 글 작성 logic
     */
    @Transactional
    public RegionEventDTO write(int userId, RegionEventDTO regionEventDTO, String image) {
        UserEntity findUser = validate(userId, regionEventDTO);

        regionEventDTO.setUserInfo(findUser.getId(), findUser.getNickname(), image);
        RegionalEventEntity saveRegionEvent = regionDB.save(RegionalEventEntity.toEntity(regionEventDTO));
        regionEventDTO.setRegionId(saveRegionEvent.getId());

        return regionEventDTO;
    }

    /**
     * 유효성 검사 logic
     */
    private UserEntity validate(int userId, RegionEventDTO regionEventDTO) {
        UserEntity findUser = userDB.findById(userId).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_USER));
        if (regionEventDTO == null)
            throw new KkaebiException(NO_INPUT_INFORMATION);

        if (findUser.getRole() != UserRole.EDITOR)
            throw new KkaebiException(DOES_NOT_EDIT_USER);

        if (findUser.getId() != userId)
            throw new KkaebiException(DOES_NOT_MATCH_USER);
        return findUser;
    }

    /**
     * 글 수정 logic
     */
    @Transactional
    public void edit(int userId, RegionEventDTO regionEventDTO, String image) {
        validate(userId, regionEventDTO);

        RegionalEventEntity findRegionEvent = regionDB.findById(regionEventDTO.getRegionId()).orElseThrow(() -> new KkaebiException(EDIT_EXCEPTION));

        regionEventDTO.setPosterImageUrl(image);
        findRegionEvent.change(regionEventDTO);
    }

    /**
     * 글 삭제 logic
     */
    @Transactional
    public void delete(int userId, int regionBoardId) {
        UserEntity findUser = userDB.findById(userId).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_USER));
        if (findUser.getRole() != UserRole.EDITOR)
            throw new KkaebiException(EDIT_EXCEPTION);
        regionDB.deleteById(regionBoardId);
    }

    /**
     * 지역축제 상세보기 logic
     */
    @Transactional
    public RegionEventDTO showRegionEvent(int regionBoardId) {
        RegionalEventEntity findRegionEvent = regionDB.findById(regionBoardId).orElseThrow(() -> new KkaebiException(EDIT_EXCEPTION));
        findRegionEvent.updateView(findRegionEvent.getBaseWrite().getView());
        return RegionEventDTO.toDto(findRegionEvent);
    }


    /**
     * 최신순 게시물 3개, 4개 return
     */
    public HashMap<Integer, List<RegionEventDTO>> findAll(Pageable pageable) {
        HashMap<Integer, List<RegionEventDTO>> regionList = new HashMap<>();
        regionList.put(1, regionDB.findTop4ByOrderByIdDesc().stream().map(RegionEventDTO::new).collect(Collectors.toList()));
        regionList.put(2, regionDB.findAllByOrderByIdDesc(pageable).stream().map(RegionEventDTO::new).collect(Collectors.toList()));
        return regionList;
    }

    public List<RegionEventDTO> regionList() {
        return regionDB.findTop4ByOrderByIdDesc().stream().map(RegionEventDTO::new).collect(Collectors.toList());
    }
}