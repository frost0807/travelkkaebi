package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.PickMeDTO;
import com.bitcamp.travelkkaebi.entity.PickMeEntity;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.repository.PickMeRepository;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.bitcamp.travelkkaebi.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class PickMeService {

    private final PickMeRepository pickMeDB;
    private final UserRepository userDB;

    /**
     * entity -> dto 반환후 total 게시글 수와 page 20개씩 return logic
     */
    public ListResponseDTO findAll(Pageable pageable) {
        return ListResponseDTO.setTotalCountAndList(pickMeDB.countAllBy(), pickMeDB.findByOrderByIdDesc(pageable).stream().map(PickMeDTO::new).collect(Collectors.toList()));
    }

    /**
     * pickMe write logic
     * pickMeDTO validate 후 DB save -> 유저의 nickname, profileImage, userId 를 셋팅후 쓴 글 return
     */
    @Transactional
    public PickMeDTO write(int userId, PickMeDTO pickMeDTO) {
        UserEntity findUser = validate(userId, pickMeDTO);
        PickMeEntity savePickMe = pickMeDB.save(PickMeEntity.toEntity(pickMeDTO, userId));
        pickMeDTO.setUserInfo(findUser.getProfileImageUrl(), findUser.getMannerDegree(), userId, savePickMe.getId(), findUser.getNickname());

        return pickMeDTO;
    }

    /**
     * userInfo, null -> validate
     */
    private UserEntity validate(int userId, PickMeDTO pickMeDTO) {
        UserEntity findUser = userDB.findById(userId).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_USER));
        if (pickMeDTO == null) throw new KkaebiException(NO_INPUT_INFORMATION);

        if (findUser.getId() != userId) throw new KkaebiException(DOES_NOT_MATCH_USER);

        return findUser;
    }

    /**
     * pickMe update logic
     */
    @Transactional
    public PickMeDTO update(int userId, PickMeDTO pickMeDTO) {
        validate(userId, pickMeDTO);
        PickMeEntity findPickMe = pickMeDB.findById(pickMeDTO.getBoardId()).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));
        findPickMe.change(pickMeDTO);

        return PickMeDTO.toDto(findPickMe);
    }

    /**
     * pickMe delete logic
     */
    @Transactional
    public void delete(int userId, int pickMeId) {
        PickMeEntity findPickMe = pickMeDB.findById(pickMeId).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));
        if (findPickMe.getUserEntity().getId() != userId) throw new KkaebiException(DOES_NOT_MATCH_USER);

        pickMeDB.delete(findPickMe);
    }

    /**
     * nickName search logic
     */
    public ListResponseDTO findByNickname(String nickname, Pageable pageable) {
        List<PickMeEntity> findPickMeList = pickMeDB.findAllByUserEntityNicknameContainingOrderByIdDesc(nickname, pageable).getContent();
        if (findPickMeList.isEmpty())
            throw new KkaebiException(NO_SEARCH);

        return ListResponseDTO.setTotalCountAndList(pickMeDB.countByUserEntityNickname(nickname), findPickMeList.stream().map(PickMeDTO::new).collect(Collectors.toList()));
    }

    /**
     * title search logic
     */
    public ListResponseDTO findByTitle(String title, Pageable pageable) {
        List<PickMeEntity> findByTitleList = pickMeDB.findAllByWriteInfoTitleContainingOrderByIdDesc(title, pageable).getContent();
        if (findByTitleList.isEmpty())
            throw new KkaebiException(NO_SEARCH);

        return ListResponseDTO.setTotalCountAndList(pickMeDB.countByWriteInfoTitle(title), findByTitleList.stream().map(PickMeDTO::new).collect(Collectors.toList()));
    }

    /**
     * keyword search logic  %like%
     */
    public ListResponseDTO findByKeyword(String region, Pageable pageable) {
        List<PickMeEntity> findByKeyword = pickMeDB.findAllByRegion(region, pageable).getContent();
        if (findByKeyword.isEmpty())
            throw new KkaebiException(NO_SEARCH);

        return ListResponseDTO.setTotalCountAndList(pickMeDB.countByRegion(region), findByKeyword.stream().map(PickMeDTO::new).collect(Collectors.toList()));
    }

    /**
     * 게시물 상세보기 logic
     */
    @Transactional
    public PickMeDTO findById(int boardId) {
        PickMeEntity findPickMe = pickMeDB.findById(boardId).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_BOARD));
        findPickMe.updateView(findPickMe.getWriteInfo().getView());
        return PickMeDTO.toDto(findPickMe);
    }
}
