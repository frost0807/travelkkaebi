package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.ImageAndCommentMapper;
import com.bitcamp.travelkkaebi.model.ImageAndCommentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageAndCommentService {

    private final AwsS3service awsS3service;
    private final ImageAndCommentMapper imageAndCommentMapper;

    public boolean insert(List<MultipartFile> imageList,
      List<ImageAndCommentDTO> commentList, int userId) throws Exception {

        int sucessCount = 0;
        for(int i = 0; i < commentList.size(); i++) {
            ImageAndCommentDTO imageAndCommentDTO = commentList.get(i);

            // 로그인 한 유저의 식별자 set
            imageAndCommentDTO.setUserId(userId);

            // 아마존 s3에 이미지 저장 및 url set
            imageAndCommentDTO.setImageUrl(awsS3service.upload(imageList.get(i), "static"));

            sucessCount += imageAndCommentMapper.insert(imageAndCommentDTO);
        }
        return (sucessCount == commentList.size() ? true : false);
    }
}
