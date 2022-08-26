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
    private final String DEFAULT_PATH = "저장경로";
    private final UserService userService;
    private final ImageMapper imageMapper;

    public List<ImageDTO> selectAll(ImageDTO i){
        return imageMapper.selectAll(i);
    }

    public ImageDTO insert(MultipartFile image, ImageDTO i, int userId) throws IOException{
        //통신 중간에 userId를 변조할 수 있으므로 DB에 저장된 userId와 로그인된 userId가 동일한지 확인
        if(imageMapper.selectOne(i.getImageId()).getUserId()==userId){
            i.setImageUrl(saveImage(image));
            imageMapper.insert(i);

            return imageMapper.selectOne(i.getImageId());
        } else{
            return null;
        }
    }

    public ImageDTO update(MultipartFile image, ImageDTO i, int userId) throws IOException{
        if(imageMapper.selectOne(i.getImageId()).getUserId()==userId){
            i.setImageUrl(saveImage(image));
            imageMapper.update(i);

            return imageMapper.selectOne(i.getImageId());
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

    public String saveImage(MultipartFile image) throws IOException{
        String path=DEFAULT_PATH+image.getOriginalFilename();
        image.transferTo(new File(path));

        return path;
    }
}