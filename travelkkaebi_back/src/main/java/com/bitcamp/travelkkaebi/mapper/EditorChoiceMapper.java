package com.bitcamp.travelkkaebi.mapper;

import com.bitcamp.travelkkaebi.dto.EditorChoiceResponseDTO;
import com.bitcamp.travelkkaebi.dto.PageAndWordDTO;
import com.bitcamp.travelkkaebi.model.EditorChoiceDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Mapper
public interface EditorChoiceMapper {

    List<EditorChoiceResponseDTO> selectAllByPage(HashMap<String, Integer> pageMap);

    Optional<EditorChoiceResponseDTO> selectOne (int editorChoiceId);

    String selectRole (int editorChoiceId);

    int insert (EditorChoiceDTO editorChoiceDTO);

    int update(EditorChoiceDTO editorChoiceDTO);

    int delete(int editorChoiceId);

    int viewPlus(int editorChoiceId);

    int editorChoiceCount();

    List<EditorChoiceResponseDTO> searchByTitle(PageAndWordDTO pageAndWordDTO);

    List<EditorChoiceResponseDTO> searchByContent(PageAndWordDTO pageAndWordDTO);

    List<EditorChoiceResponseDTO> searchByWriter(PageAndWordDTO pageAndWordDTO);

    List<EditorChoiceResponseDTO> keywordByRegion(PageAndWordDTO pageAndWordDTO);

    int countByTitle(String word);

    int countByContent(String word);

    int countByWriter(String word);

    int countByRegion(String word);

    List<EditorChoiceResponseDTO> selectAllNew();
}
