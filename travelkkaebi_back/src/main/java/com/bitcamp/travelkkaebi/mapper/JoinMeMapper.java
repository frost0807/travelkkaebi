package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface JoinMeMapper {
    JoinMeDTO selectOne(JoinMeDTO joinMeDTO);
    List<JoinMeDTO> selectAllByPage(HashMap<String, Integer> pageMap);
}