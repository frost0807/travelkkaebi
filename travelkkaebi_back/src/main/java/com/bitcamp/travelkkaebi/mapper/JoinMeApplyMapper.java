package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.JoinMeApplyResponseDTO;
import com.bitcamp.travelkkaebi.dto.JoinMeIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.PageAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.PrimaryIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.dto.parameter.PageAndJoinMeIdAndUserIdDTO;
import com.bitcamp.travelkkaebi.model.JoinMeApplyDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface JoinMeApplyMapper {
    int getBoardCountByJoinMeId(JoinMeIdAndUserIdDTO joinMeIdAndUserIdDTO);
    int getBoardCountByUserId(int userId);
    int getBoardCountByUserIdSelected(int userId);
    int getBoardCountByUserIdNotSelected(int userId);
    List<JoinMeApplyResponseDTO> selectAllByJoinMeId(PageAndJoinMeIdAndUserIdDTO pageAndJoinMeIdAndUserIdDTO);
    List<JoinMeApplyResponseDTO> selectAllByUserId(PageAndUserIdDTO pageAndUserIdDTO);
    List<JoinMeApplyResponseDTO> selectAllByUserIdSelected(PageAndUserIdDTO pageAndUserIdDTO);
    List<JoinMeApplyResponseDTO> selectAllByUserIdNotSelected(PageAndUserIdDTO pageAndUserIdDTO);
    Optional<JoinMeApplyResponseDTO> selectOne(int joinMeApplyId);
    Optional<Integer> checkValidUserAndGetJoinMeId(PrimaryIdAndUserIdDTO primaryIdAndUserIdDTO);
    int insert(JoinMeApplyDTO joinMeApplyDTO);
    int updateSelectedTrue(int joinMeApplyId);
}