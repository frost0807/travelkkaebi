package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.JoinMeApplyDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface JoinMeApplyMapper {
    List<JoinMeApplyDTO> selectAllByWriterId();
    List<JoinMeApplyDTO> selectAllByUserId();
    int insert(JoinMeApplyDTO joinMeApplyDTO);
}