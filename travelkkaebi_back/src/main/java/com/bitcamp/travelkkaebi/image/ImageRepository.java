package com.bitcamp.travelkkaebi.image;

import com.bitcamp.travelkkaebi.exception.ErrorCode;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Repository
public class ImageRepository {

    static final String FILE_PATH = "/Users/kimjongchan/study/JpaBoard/src/main/resources/static/images/";
    static final String BASIC_IMAGE_URL = "basic.jpg";

    public String saveImageFile(MultipartFile image) {
        try {
            String filePath;
            if (image.getOriginalFilename().isEmpty()) {
                filePath = FILE_PATH + BASIC_IMAGE_URL;
            } else {
                filePath = FILE_PATH + image.getOriginalFilename();
            }
            image.transferTo(new File(filePath));
            return filePath;
        } catch (IllegalStateException | IOException e) {
            throw new KkaebiException(ErrorCode.PROFILE_SAVE_FAIL);
        }
    }
}
