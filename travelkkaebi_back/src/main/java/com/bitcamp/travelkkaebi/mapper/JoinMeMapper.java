package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface JoinMeMapper {
    int getCount();
    List<JoinMeDTO> selectAllByPage(HashMap<String, Integer> pageMap);
    JoinMeDTO selectOne(int joinMeId);
    int insert(JoinMeDTO joinMeDTO);
    int update(JoinMeDTO joinMeDTO);
    int updateSelectOne(JoinMeDTO joinMeDTO);
    int updateClosed(JoinMeDTO joinMeDTO);
    int delete(int joinMeId);
}