package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.EditorChoiceResponseDTO;
import com.bitcamp.travelkkaebi.dto.ListResponseDTO;
import com.bitcamp.travelkkaebi.dto.PageAndWordDTO;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.entity.UserRole;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.mapper.EditorChoiceMapper;
import com.bitcamp.travelkkaebi.model.EditorChoiceDTO;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static com.bitcamp.travelkkaebi.exception.ErrorCode.*;
import static com.bitcamp.travelkkaebi.exception.ErrorCode.DOES_NOT_EXIST_BOARD;
import static com.bitcamp.travelkkaebi.exception.ErrorCode.FAILED_TO_UPDATE_VIEW;

@Service
@RequiredArgsConstructor
public class EditorChoiceService {

    private final EditorChoiceMapper editorChoiceMapper;
    private final UserRepository userRepository;
    private final AwsS3service awsS3service;
    private final int PAGE_SIZE = 20;

    /**
     * 게시글 작성
     * @param editorChoiceDTO
     * @param userId
     * @return writtenId
     * @throws Exception
     */

    public boolean write(EditorChoiceDTO editorChoiceDTO, MultipartFile image1,
                                         MultipartFile image2, MultipartFile image3, int userId) throws Exception {

        UserEntity findUser = userRepository.findById(userId).orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_USER));

        // 로그인 된 유저가 에디터인지 확인하는 코드
        if (findUser.getRole().equals(UserRole.EDITOR)) {
            editorChoiceDTO.setUserId(userId);

            if (image1 == null) {
                editorChoiceDTO.setEditorImgUrl1(" ");
            } else {
                editorChoiceDTO.setEditorImgUrl1(awsS3service.upload(image1, "static"));
            }

            if (image2 != null) {
                editorChoiceDTO.setEditorImgUrl2(awsS3service.upload(image2, "static"));
            } else {
                editorChoiceDTO.setEditorImgUrl2(" ");
            }

            if (image3 != null) {
                editorChoiceDTO.setEditorImgUrl3(awsS3service.upload(image3, "static"));
            } else {
                editorChoiceDTO.setEditorImgUrl3(" ");
            }

            editorChoiceMapper.insert(editorChoiceDTO);
            return true;

        } else {
            throw new KkaebiException(DOES_NOT_EDIT_USER);
        }
    }

    /**
     * 게시글 수정
     * @param editorChoiceDTO
     * @param userId
     * @return updatedId
     * @throws Exception
     */

    @Transactional
    public EditorChoiceResponseDTO update(EditorChoiceDTO editorChoiceDTO, MultipartFile image1,
                                          MultipartFile image2, MultipartFile image3, int userId) throws Exception {

        if (userId == editorChoiceDTO.getUserId()) {

            if (image1 != null) {
                editorChoiceDTO.setEditorImgUrl1(awsS3service.upload(image1, "static"));
            } else {
                editorChoiceDTO.setEditorImgUrl1(" ");
            }

            if (image2 != null) {
                editorChoiceDTO.setEditorImgUrl2(awsS3service.upload(image2, "static"));
            } else {
                editorChoiceDTO.setEditorImgUrl2(" ");
            }

            if (image3 != null) {
                editorChoiceDTO.setEditorImgUrl3(awsS3service.upload(image3, "static"));
            } else {
                editorChoiceDTO.setEditorImgUrl3(" ");
            }
            editorChoiceMapper.update(editorChoiceDTO);
            return selectOne(editorChoiceDTO.getEditorChoiceId());
        } else {
            throw new KkaebiException(DOES_NOT_MATCH_USER);
        }
    }

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
            throw new KkaebiException(DOES_NOT_MATCH_USER);
        }
    }

    /**
     * 게시글 리스트
     * @param pageNo
     * @return list
     * @throws Exception
     */
    public List<EditorChoiceResponseDTO> selectAllByPage(int pageNo) throws Exception {
        if(pageNo <= pageCount()) {
            HashMap<String, Integer> pageMap = new HashMap<>();
            int startNum = (pageNo - 1) * PAGE_SIZE;

            pageMap.put("startNum", startNum);
            pageMap.put("PAGE_SIZE", PAGE_SIZE);

            return editorChoiceMapper.selectAllByPage(pageMap);
        } else {
            throw new RuntimeException("요청한 페이지의 크기가 게시글 리스트보다 많습니다.");
        }
    }

    /**
     * 게시글 리스트 (신규)
     * @return
     * @throws Exception
     */
    public List<EditorChoiceResponseDTO> selectAllNew() throws Exception {
        return editorChoiceMapper.selectAllNew();
    }

    /**
     * 게시글 리스트 (추천)
     */
    public List<EditorChoiceResponseDTO> selectAllGood(List<Integer> boardIdList) throws Exception {
        List<EditorChoiceResponseDTO> goodList = new ArrayList<>();

        for (int i:boardIdList) {
            goodList.add(editorChoiceMapper.selectOne(i)
                    .orElseThrow(()-> new KkaebiException(DOES_NOT_EXIST_BOARD)));
        }
        return goodList;
    }


    /**
     * 게시글 상세보기
     * @param editorChoiceId
     * @return editorChoiceResponseDTO
     */
    public EditorChoiceResponseDTO selectOne(int editorChoiceId) throws Exception {
        // 조회수 더해주는 코드
        if (editorChoiceMapper.viewPlus(editorChoiceId) != 0) {
            return editorChoiceMapper.selectOne(editorChoiceId)
                    .orElseThrow(()-> new KkaebiException(DOES_NOT_EXIST_BOARD));
        } else {
            throw new KkaebiException(FAILED_TO_UPDATE_VIEW);
        }
    }

    /**
     * 전체 게시글 갯수 리턴
     */
    public int count() throws Exception {
        return editorChoiceMapper.editorChoiceCount();
    }

    /**
     * selectAll 할 때 페이지 수 리턴
     */
    public int pageCount() throws Exception {
        int total = count();

        if (total % PAGE_SIZE == 0) {
            return total / PAGE_SIZE;
        } else {
            return (total / PAGE_SIZE) + 1;
        }
    }

    /**
     * 특정 제목으로 검색
     * @param word (=title)
     * @return titleList
     * @throws Exception
     */
    public ListResponseDTO searchByTitle(String word, int pageNo) throws Exception {
        List<EditorChoiceResponseDTO> list = editorChoiceMapper.searchByTitle(setPageAndWord(pageNo, word));
        return setListResponse(editorChoiceMapper.countByTitle(word), list);
    }


    /**
     * 특정 내용으로 검색
     * @param word (=content)
     * @return contentList
     * @throws Exception
     */
    public ListResponseDTO searchByContent(String word, int pageNo) throws Exception {
        List<EditorChoiceResponseDTO> list = editorChoiceMapper.searchByContent(setPageAndWord(pageNo, word));
        return setListResponse(editorChoiceMapper.countByContent(word), list);
    }


    /**
     * 특정 작성자로 검색
     * @param word (= writer)
     * @return writerList
     * @throws Exception
     */
    public ListResponseDTO searchByWriter(String word, int pageNo) throws Exception {
        List<EditorChoiceResponseDTO> list = editorChoiceMapper.searchByWriter(setPageAndWord(pageNo, word));
        return setListResponse(editorChoiceMapper.countByWriter(word), list);
    }


    /**
     * (지역) 키워드로 검색
     * @param word (=region)
     * @return
     * @throws Exception
     */

    public ListResponseDTO keywordByRegion(String word, int pageNo) throws Exception {
        List<EditorChoiceResponseDTO> list = editorChoiceMapper.keywordByRegion(setPageAndWord(pageNo, word));
        return setListResponse(editorChoiceMapper.countByRegion(word), list);
    }

    /**
     * 페이지 번호 및 키워드 세팅
     */
    public PageAndWordDTO setPageAndWord(int pageNo, String word) {
        return PageAndWordDTO.builder()
                .startNum((pageNo - 1) * PAGE_SIZE)
                .pageSize(PAGE_SIZE)
                .word(word)
                .build();
    }

    /**
     * 검색 및 키워드 게시물 리스트와 총 페이지수 세팅
     */
    public ListResponseDTO setListResponse(int totalPageCount, List<EditorChoiceResponseDTO> list) {
        return ListResponseDTO.builder()
                .totalBoardCount(totalPageCount)
                .list(list)
                .build();
    }

}

