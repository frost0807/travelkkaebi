package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.model.JoinMeDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class JoinMeRepository {
    private final String NAMESPACE = "mapper.JoinMeMapper";

    @Autowired
    private SqlSession sqlSession;

    public JoinMeDTO selectOne(JoinMeDTO j){
        return sqlSession.selectOne(NAMESPACE+".selectOne", j);
    }

    public List<JoinMeDTO> selectAllByPage(HashMap<String, Integer> pageMap){
        return sqlSession.selectList(NAMESPACE+"selectAllByPage", pageMap);
    }
}
