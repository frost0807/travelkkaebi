package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.JoinMeListDTO;
import com.bitcamp.travelkkaebi.dto.JoinMeOneDTO;
import com.bitcamp.travelkkaebi.dto.PageAndKeywordDTO;
import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface JoinMeMapper {
    int getPageCount();
    int getPageCountByKeyword(String keyword);
    List<JoinMeListDTO> selectAllByPage(PageAndKeywordDTO pageAndKeywordDTO);
    List<JoinMeListDTO> selectAllByPageAndKeyword(PageAndKeywordDTO PageAndKeywordDTO);
    JoinMeOneDTO selectOne(int joinMeId);
    int insert(JoinMeDTO joinMeDTO);
    int update(JoinMeDTO joinMeDTO);
    int updateView(int joinMeId);
    int updateClosed(JoinMeListDTO joinMeListDTO);
    int delete(int joinMeId);
}