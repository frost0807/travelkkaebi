package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.ImageMapper;
import com.bitcamp.travelkkaebi.model.ImageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final AwsS3service awsS3service;
    private final ImageMapper imageMapper;

    public List<ImageDTO> selectAll(ImageDTO imageDTO){
        return imageMapper.selectAll(imageDTO);
    }

    public ImageDTO insert(MultipartFile image, ImageDTO imageDTO, int userId) throws IOException{
        //로그인한 유저의 식별자set
        imageDTO.setUserId(userId);
        //아마존s3에 이미지저장하고 url Set해주는 부분
        imageDTO.setImageUrl(awsS3service.upload(image, "static"));
        imageMapper.insert(imageDTO);

        return imageMapper.selectOne(imageDTO.getImageId());
    }

    public ImageDTO update(MultipartFile image, ImageDTO imageDTO, int userId) throws IOException{
        //통신 중간에 userId를 변조할 수 있으므로 DB에 저장된 userId와 로그인된 userId가 동일한지 확인
        if(imageMapper.selectOne(imageDTO.getImageId()).getUserId()==userId){
            //아마존s3에 이미지저장하고 url Set해주는 부분
            imageDTO.setImageUrl(awsS3service.upload(image, "static"));
            imageMapper.update(imageDTO);

            return imageMapper.selectOne(imageDTO.getImageId());
        } else{
            return null;
        }
    }

    public int delete(int imageId, int userId) throws IOException{
        if(imageMapper.selectOne(imageId).getUserId()==userId){
            return imageMapper.delete(imageId);
        } else{
            return 0;
        }
    }
}