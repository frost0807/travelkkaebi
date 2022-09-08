package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.DeleteUserDTO;
import com.bitcamp.travelkkaebi.dto.LogInDTO;
import com.bitcamp.travelkkaebi.dto.UserDTO;
import com.bitcamp.travelkkaebi.dto.UserUpdateDTO;
import com.bitcamp.travelkkaebi.encode.Password;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.exception.KkaebiException;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import com.bitcamp.travelkkaebi.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.bitcamp.travelkkaebi.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userDB;
    private final TokenProvider tokenProvider;

    /**
     * 회원가입 logic
     */
    @Transactional
    public void register(UserDTO userDTO, String uploadImageUrl) {
        //username 및 email 중복체크 method
        validate(userDTO.getUsername(), userDTO.getEmail());

        //dto, imageUrl -> entity 변환후 DB save
        UserEntity userEntity = UserDTO.toUserEntity(userDTO);
        userEntity.setProfileImageUrl(uploadImageUrl);

        userDB.save(userEntity);
    }

    /**
     * username, email, nickname 중복체크 logic 존재 -> true, 존재x -> false
     */
    public boolean usernameCheck(String username) {
        return userDB.existsByUsername(username);
    }

    private boolean emailCheck(String email) {
        return userDB.existsByEmail(email);
    }

    public boolean nicknameCheck(String nickname) {
        return userDB.existsByNickname(nickname);
    }

    private void validate(String username, String email) {
        if (usernameCheck(username) || emailCheck(email))
            throw new KkaebiException(ALREADY_EXIST_USERNAME);
    }

    /**
     * 로그인 logic
     */
    public LogInDTO auth(String username, String password) {
        UserEntity findUser = userDB.findByUsername(username)
                .orElseThrow(() -> new KkaebiException(DOES_NOT_EXIST_USER));
        //password 일치 check
        if (Password.passwordMatch(password, findUser.getPassword())) {
            // create token
            String token = tokenProvider.create(findUser);
            //발급된 토큰및 entity -> dto 변환후 함께 리턴
            return LogInDTO.toDto(findUser, token);
        }
        return null;
    }

    /**
     * 회원정보 update logic
     */
    @Transactional
    public void update(int userId, UserUpdateDTO userUpdateDTO, String uploadImageUrl) {
        UserEntity findUser = userDB.findById(userUpdateDTO.getUserid()).orElseThrow(() -> new KkaebiException(USER_UPDATE_EXCEPTION));
        validateUserId(userId, findUser);

        userUpdateDTO.setProfileImageUrl(uploadImageUrl);
        findUser.change(userUpdateDTO);
    }


    /**
     * 회원정보 delete logic
     */
    @Transactional
    public void delete(int userId, DeleteUserDTO deleteUserDTO) {
        UserEntity deleteUser = userDB.findById(deleteUserDTO.getUserid()).orElseThrow(() -> new KkaebiException(USER_DELETE_EXCEPTION));
        validateUserId(userId, deleteUser);

        if (!Password.passwordMatch(deleteUserDTO.getPassword(), deleteUser.getPassword()))
            throw new KkaebiException(DOES_NOT_MATCH_PASSWORD);

        userDB.delete(deleteUser);
    }

    private void validateUserId(int userId, UserEntity findUser) {
        if (userId != findUser.getId())
            throw new KkaebiException(DOES_NOT_EXIST_USER);
    }

}
