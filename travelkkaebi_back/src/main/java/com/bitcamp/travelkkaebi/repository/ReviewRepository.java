package com.bitcamp.travelkkaebi.repository;

import com.bitcamp.travelkkaebi.model.ReviewDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewRepository {

    private final String NAMESPACE = "mapper.ReviewMapper";

    @Autowired
    SqlSession sqlSession;

    // 후기 등록하는 메소드
    public int insert(ReviewDTO review) {
        System.out.println("레포지토리");

        int success = sqlSession.insert(NAMESPACE + ".insert", review);
        int writtenReviewId = review.getReviewId();

        // 성공하면 생성된 id 값 리턴, 실패하면 0 리턴
        return success * writtenReviewId;
    }

    // 후기 수정 메소드
    public int update(ReviewDTO reviewDTO) {
        int success = sqlSession.update(NAMESPACE + ".update", reviewDTO);
        int updatedId = reviewDTO.getReviewId();

        // 성공하면 생성된 id 값 리턴, 실패하면 0 리턴
        return success * updatedId;
    }

    public int delete(int reviewId) {
        // 성공하면 1, 실패하면 0 리턴
        return sqlSession.delete(NAMESPACE+".delete", reviewId);
    }



    // 후기 보여주는 메소드
    public List<ReviewDTO> selectAll(int pageNo) {
        return sqlSession.selectList(NAMESPACE + ".selectAll", pageNo);
    }
}
