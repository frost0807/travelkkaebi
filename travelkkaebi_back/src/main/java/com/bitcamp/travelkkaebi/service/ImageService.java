package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.ImageMapper;
import com.bitcamp.travelkkaebi.model.ImageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final AwsS3service awsS3service;
    private final ImageMapper imageMapper;

    public List<String> temporaryInsert(List<MultipartFile> imageList) throws Exception {
        List<String> resultImageUrlList = new ArrayList<>();
        for (MultipartFile image : imageList) {
            resultImageUrlList.add(awsS3service.upload(image, "static"));
        }
        return resultImageUrlList;
    }

    public List<ImageDTO> selectAll(int categoryId, int boardId) {
        return imageMapper.selectAll(ImageDTO.builder().categoryId(categoryId).boardId(boardId).build());
    }

    public boolean insert(List<ImageDTO> imageDTOList, int userId) throws Exception {
        int successCount = 0;
        //로그인한 유저의 식별자set
        for (ImageDTO imageDTO : imageDTOList) {
            imageDTO.setUserId(userId);
            successCount += imageMapper.insert(imageDTO);
        }
        //이미지파일
        return (successCount == imageDTOList.size());
    }

//    public boolean insert(List<MultipartFile> imageList, ImageDTO imageDTO, int userId) throws Exception {
//        int successCount = 0;
//        //로그인한 유저의 식별자set
//        imageDTO.setUserId(userId);
//        for (int i = 0; i < imageList.size(); i++) {
//            //아마존s3에 이미지저장하고 url Set해주는 부분
//            imageDTO.setImageUrl(awsS3service.upload(imageList.get(i), "static"));
//            successCount += imageMapper.insert(imageDTO);
//        }
//        //이미지파일 저장과 경로삽입이 모두 다 성공적으로 끝나면 true리턴
//        return (successCount == imageList.size());
//    }

    @Transactional
    public boolean update(List<MultipartFile> imageList, ImageDTO imageDTO, int userId) throws Exception {
        int successCount = 0;
        //로그인한 유저의 식별자set
        imageDTO.setUserId(userId);
        for (int i = 0; i < imageList.size(); i++) {
            //아마존s3에 이미지저장하고 url Set해주는 부분
            imageDTO.setImageUrl(awsS3service.upload(imageList.get(i), "static"));
            successCount += imageMapper.update(imageDTO);
        }
        //업데이트된 이미지파일들의 저장과 경로update가 모두 다 성공적으로 끝나면 true리턴
        return (successCount == imageList.size());
    }

    @Transactional
    public boolean delete(List<Integer> imageIdList, int userId) throws Exception {
        int successCount = 0;
        for (int imageId : imageIdList) {
            ImageDTO imageDTO = ImageDTO.builder().imageId(imageId).userId(userId).build();
            successCount += imageMapper.delete(imageDTO);
        }
        return (successCount == imageIdList.size());
    }
}