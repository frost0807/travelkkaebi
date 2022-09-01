package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.RegionEventDTO;
import com.bitcamp.travelkkaebi.entity.RegionalEventEntity;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.entity.UserRole;
import com.bitcamp.travelkkaebi.repository.RegionEventRepository;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class RegionEventService {

    private final RegionEventRepository regionEventRepository;
    private final UserRepository userRepository;

    /*public List<RegionEventDTO> findAll() {
        List<RegionalEventEntity> findRegion = regionEventRepository.findAll();
        return findRegion.stream().map(RegionEventDTO::new).collect(Collectors.toList());
    }*/

    /**
     * 글 작성 logic
     */
    @Transactional
    public RegionEventDTO write(int userId, RegionEventDTO regionEventDTO, String image) {
        UserEntity findUser = validate(userId, regionEventDTO);

        regionEventDTO.setUserIdAndNicknameAndPosterImageUrl(findUser.getId(), findUser.getNickname(), image);

        RegionalEventEntity saveRegionEvent = regionEventRepository.save(RegionalEventEntity.toEntity(regionEventDTO));

        regionEventDTO.setId(saveRegionEvent.getId());
        return regionEventDTO;
    }

    /**
     * 유효성 검사 logic
     */
    private UserEntity validate(int userId, RegionEventDTO regionEventDTO) {
        UserEntity findUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("does not exist"));
        if (regionEventDTO == null)
            throw new RuntimeException("입력 정보가 없습니다.");

        if (findUser.getRole() != UserRole.EDITOR)
            throw new RuntimeException("not an editor");

        if (regionEventDTO.getUserId() != userId)
            throw new RuntimeException("회원정보가 일치하지 앖습니다.");
        return findUser;
    }

    /**
     * 글 수정 logic
     */
    @Transactional
    public void edit(int userId, RegionEventDTO regionEventDTO, String image) {
        validate(userId, regionEventDTO);

        RegionalEventEntity findRegionEvent = regionEventRepository.findById(regionEventDTO.getId()).orElseThrow(() -> new RuntimeException("edit exception"));

        regionEventDTO.setPosterImageUrl(image);
        findRegionEvent.change(regionEventDTO);
    }

    /**
     * 글 삭제 logic
     */
    @Transactional
    public void delete(int userId, int regionBoardId) {
        UserEntity findUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("does not exist"));
        if (findUser.getRole() != UserRole.EDITOR)
            throw new RuntimeException("not an editor");
        regionEventRepository.deleteById(regionBoardId);
    }

    /**
     * 지역축제 상세보기 logic
     */
    public RegionEventDTO showRegionEvent(int regionBoardId) {
        RegionalEventEntity findRegionEvent = regionEventRepository.findById(regionBoardId).orElseThrow(() -> new RuntimeException("edit exception"));
        return RegionEventDTO.toDto(findRegionEvent);
    }

    /**
     * 조회수 증가 logic
     */
    @Transactional
    public void updateView(int regionBoardId) {
        RegionalEventEntity findRegionEvent = regionEventRepository.findById(regionBoardId).orElseThrow(() -> new RuntimeException("edit exception"));
        findRegionEvent.updateView(findRegionEvent.getView());
    }

    /**
     * 최신순 4개씩 pagination logic
     */
    public Page<RegionEventDTO> findAll(Pageable pageable) {
        return regionEventRepository.findByOrderByIdDesc(pageable).map(RegionEventDTO::new);
    }
}