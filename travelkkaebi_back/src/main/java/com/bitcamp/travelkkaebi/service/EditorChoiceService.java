package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.EditorChoiceResponseDTO;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.entity.UserRole;
import com.bitcamp.travelkkaebi.mapper.EditorChoiceMapper;
import com.bitcamp.travelkkaebi.model.EditorChoiceDTO;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EditorChoiceService {

    private final EditorChoiceMapper editorChoiceMapper;
    private final UserRepository userRepository;
    private final int PAGE_SIZE = 10;

    /**
     * 게시글 작성
     * @param editorChoiceDTO
     * @param userId
     * @return writtenId
     * @throws Exception
     */

    public EditorChoiceResponseDTO write(EditorChoiceDTO editorChoiceDTO, int userId) throws Exception {
        UserEntity findUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("없습니다"));

        // 로그인 된 유저가 에디터 인지 확인하는 코드
        if (findUser.getRole().equals(UserRole.EDITOR)) {
            editorChoiceDTO.setUserId(userId);
            editorChoiceMapper.insert(editorChoiceDTO);

            return editorChoiceMapper.selectOne(editorChoiceDTO.getEditorChoiceId())
                    .orElseThrow(()-> new NullPointerException("작성한 게시물이 존재하지 않음"));

        } else {
            throw new RuntimeException("글 작성 권한이 없습니다.");
        }
    }

    /**
     * 게시글 수정
     * @param editorChoiceDTO
     * @param userId
     * @return updatedId
     * @throws Exception
     */

//    @Transactional
//    public EditorChoiceResponseDTO update(EditorChoiceDTO editorChoiceDTO, int userId) throws Exception {
//
//        if (userId == editorChoiceDTO.getUserId()) {
//            editorChoiceMapper.update(editorChoiceDTO);
//            return selectOne(editorChoiceDTO.getEditorChoiceId());
//        } else {
//            throw new RuntimeException("글 수정 권한이 없습니다.");
//        }
//    }

    /**
     * 게시글 삭제
     * @param editorChoiceDTO
     * @param userId
     * @return deletedId
     * @throws Exception
     */

    @Transactional
    public int delete(EditorChoiceDTO editorChoiceDTO, int userId) throws Exception {

        if (userId == editorChoiceDTO.getUserId()) {
            return editorChoiceMapper.delete(editorChoiceDTO.getEditorChoiceId());
        } else {
            return 0;
        }
    }

    /**
     * 게시글 리스트
     * @param pageNo
     * @return list
     * @throws Exception
     */



//    public List<EditorChoiceResponseDTO> selectAllByPage(int pageNo) throws Exception {
//        return editorChoiceMapper.selectAllByPage(setPageAndWord(pageNo, null));
//    }
//
//    /**
//     * 게시글 리스트 (신규)
//     * @return
//     * @throws Exception
//     */
//
//    public List<EditorChoiceResponseDTO> selectAllNew() throws Exception {
//        return editorChoiceMapper.selectAllNew();
//    }
//
//
//    /**
//     * 게시글 상세보기
//     * @param editorChoiceId
//     * @return editorChoiceResponseDTO
//     */
//    public EditorChoiceResponseDTO selectOne(int editorChoiceId) throws Exception {
//        // 조회수 더해주는 코드
//        if (editorChoiceMapper.viewPlus(editorChoiceId) != 0) {
//            return editorChoiceMapper.selectOne(editorChoiceId)
//                    .orElseThrow(()-> new NullPointerException("선택한 게시물이 존재하지 않습니다."));
//        } else {
//            throw new RuntimeException("게시물 조회수 갱신 실패");
//        }
//    }
//
//    /**
//     * 전체 게시글 갯수 리턴
//     */
//    public int count() throws Exception {
//        return editorChoiceMapper.editorChoiceCount();
//    }
//
//    /**
//     * selectAll 할 때 페이지 수 리턴
//     */
//    public int pageCount() throws Exception {
//        int total = count();
//
//        if (total % PAGE_SIZE == 0) {
//            return total / PAGE_SIZE;
//        } else {
//            return (total / PAGE_SIZE) + 1;
//        }
//    }
//
//    /**
//     * 특정 제목으로 검색
//     * @param title
//     * @return titleList
//     * @throws Exception
//     */
//
//
//    public List<EditorChoiceResponseDTO> searchByTitle(String title, int pageNo) throws Exception {
//        List<EditorChoiceResponseDTO> list = editorChoiceMapper.searchByTitle(setPageAndWord(pageNo, title));
//        return setListResponse(editorChoiceMapper.)
//    }
//
//
//    /**
//     * 특정 내용으로 검색
//     * @param content
//     * @return contentList
//     * @throws Exception
//     */
//
//    public List<EditorChoiceResponseDTO> searchByContent(String content, int pageNo) throws Exception {
//
//        if (content != null) {
//            return editorChoiceMapper.searchByContent(content);
//        } else {
//            return null;
//        }
//    }
//
//    /**
//     * 특정 작성자로 검색
//     * @param writer
//     * @return writerList
//     * @throws Exception
//     */
//
//    public List<EditorChoiceResponseDTO> searchByWriter(String writer, int pageNo) throws Exception {
//
//        if (writer != null) {
//            return editorChoiceMapper.searchByWriter(writer);
//        } else {
//            return null;
//        }
//    }
//
//    /**
//     * (지역) 키워드로 검색
//     * @param region
//     * @return
//     * @throws Exception
//     */
//
//    public List<EditorChoiceResponseDTO> keywordByRegion(String region, int pageNo) throws Exception {
//
//        if (region != null) {
//            return editorChoiceMapper.keywordByRegion(region);
//        } else {
//            return null;
//        }
//    }
//
//    /**
//     * 페이지 번호 및 키워드 세팅
//     */
//    public PageAndWordDTO setPageAndWord(int pageNo, String word) {
//        return PageAndWordDTO.builder()
//                .startNum((pageNo - 1) * PAGE_SIZE)
//                .pageSize(PAGE_SIZE)
//                .word(word)
//                .build();
//    }
//
//    /**
//     * 검색 및 키워드 게시물 리스트와 총 페이지수 세팅
//     */
//    public ListResponseDTO setListResponse(int totalPageCount, List<EditorChoiceResponseDTO> list) {
//        return ListResponseDTO.builder()
//                .totalBoardCount(totalPageCount)
//                .list(list)
//                .build();
//    }

















}

