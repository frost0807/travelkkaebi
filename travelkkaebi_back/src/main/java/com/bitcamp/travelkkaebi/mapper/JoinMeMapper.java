package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface JoinMeMapper {

    List<JoinMeDTO> selectAllByPage(HashMap<String, Integer> pageMap);
    JoinMeDTO selectOne(int joinMeId);
    int insert(JoinMeDTO joinMeDTO);
    int update(JoinMeDTO joinMeDTO);
    int viewPlus(int joinMeId);
    int likePlus(int joinMeId);
    int delete(int joinMeId);
}