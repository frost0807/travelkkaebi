package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.PageAndWordDTO;
import com.bitcamp.travelkkaebi.dto.ReviewResponseDTO;
import com.bitcamp.travelkkaebi.model.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Mapper
public interface ReviewMapper {

    List<ReviewResponseDTO> selectAllByPage(HashMap<String, Integer> pageMap);
    Optional<ReviewResponseDTO> selectOne(int reviewId);

    List<ReviewResponseDTO> selectAllForMain();

    int insert(ReviewDTO reviewDTO);

    int update(ReviewDTO reviewDTO);

    int delete(ReviewDTO reviewDTO);

    int viewPlus(int reviewId);

    int reviewCount();
    List<ReviewResponseDTO> searchByTitle(PageAndWordDTO pageAndWordDTO);
    List<ReviewResponseDTO> searchByContent(PageAndWordDTO pageAndWordDTO);
    List<ReviewResponseDTO> searchByWriter(PageAndWordDTO pageAndWordDTO);
    List<ReviewResponseDTO> keywordByRegion(PageAndWordDTO pageAndWordDTO);
    int countByTitle(String word);
    int countByContent(String word);
    int countByWriter(String word);
    int countByRegion(String word);





}
