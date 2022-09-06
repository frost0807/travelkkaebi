package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.PickMeDTO;
import com.bitcamp.travelkkaebi.entity.PickMeEntity;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.repository.PickMeRepository;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PickMeService {

    private final PickMeRepository pickMeRepository;
    private final UserRepository userRepository;

    /**
     * entity -> dto 반환후 page 20개씩 return logic
     */
    public List<PickMeDTO> findAll(Pageable pageable) {
        return pickMeRepository.findByOrderByIdDesc(pageable).stream().map(PickMeDTO::new).collect(Collectors.toList());
    }

    /**
     * pickMe write logic
     * pickMeDTO validate 후 DB save -> 유저의 nickname, profileImage, userId 를 셋팅후 쓴 글 return
     */
    @Transactional
    public PickMeDTO write(int userId, PickMeDTO pickMeDTO) {
        UserEntity findUser = validate(userId, pickMeDTO);
        PickMeEntity savePickMe = pickMeRepository.save(PickMeEntity.toEntity(pickMeDTO, userId));
        pickMeDTO.setUserInfo(findUser.getProfileImageUrl(), findUser.getMannerDegree(), userId, savePickMe.getId(), findUser.getNickname());

        return pickMeDTO;
    }

    /**
     * userInfo, null -> validate
     */
    private UserEntity validate(int userId, PickMeDTO pickMeDTO) {
        UserEntity findUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("does not exist"));
        if (pickMeDTO == null)
            throw new RuntimeException("입력 정보가 없습니다.");

        if (pickMeDTO.getUserId() != userId)
            throw new RuntimeException("회원정보가 일치하지 앖습니다.");

        return findUser;
    }

    /**
     * pickMe update logic
     */
    @Transactional
    public PickMeDTO update(int userId, PickMeDTO pickMeDTO) {
        validate(userId, pickMeDTO);
        PickMeEntity findPickMe = pickMeRepository.findById(pickMeDTO.getId()).orElseThrow(() -> new RuntimeException("게시물이 없습니다."));
        findPickMe.change(pickMeDTO);

        return PickMeDTO.toDto(findPickMe);
    }

    /**
     * pickMe delete logic
     */
    @Transactional
    public void delete(int userId, int pickMeId) {
        PickMeEntity findPickMe = pickMeRepository.findById(pickMeId).orElseThrow(() -> new RuntimeException("게시물이 없습니다"));
        if (findPickMe.getUserEntity().getId() != userId)
            throw new RuntimeException("작성자와 회원정보가 일치하지 앖습니다.");

        pickMeRepository.delete(findPickMe);
    }

    /**
     * nickName search logic
     */
    public List<PickMeDTO> findByNickname(String nickname, Pageable pageable) {
        List<PickMeEntity> findPickMeList = pickMeRepository.findAllByUserEntityNicknameContainingOrderByIdDesc(nickname, pageable).getContent();
        if (findPickMeList.isEmpty())
            throw new RuntimeException("해당 닉네임으로 검색된 게시물이 없습니다.");

        return findPickMeList.stream().map(PickMeDTO::new).collect(Collectors.toList());
    }

    /**
     * title search logic
     */
    public List<PickMeDTO> findByTitle(String title, Pageable pageable) {
        List<PickMeEntity> findByTitleList = pickMeRepository.findAllByBaseWriteTitleContainingOrderByIdDesc(title, pageable).getContent();
        if (findByTitleList.isEmpty())
            throw new RuntimeException("해당 제목으로 검색된 게시물이 없습니다.");

        return findByTitleList.stream().map(PickMeDTO::new).collect(Collectors.toList());
    }

    /**
     * keyword search logic
     */
    public List<PickMeDTO> findByRegion(String keyword, Pageable pageable) {
        List<PickMeEntity> findByRegion = pickMeRepository.findAllByRegion(keyword, pageable).getContent();
        if (findByRegion.isEmpty())
            throw new RuntimeException("해당 지역으로 검색된 게시글이 없습니다.");

        return findByRegion.stream().map(PickMeDTO::new).collect(Collectors.toList());
    }

}
