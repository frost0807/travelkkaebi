package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.encode.Password;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.entity.UserRole;
import com.bitcamp.travelkkaebi.regex.Regex;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDTO {

    @Pattern(regexp = Regex.USERNAME)
    private String username;

    @Pattern(regexp = Regex.PASSWORD)
    private String password;

    @Pattern(regexp = Regex.PASSWORD)
    private String secondPassword;

    private String nickname;
    private String profileImageUrl;

    @Pattern(regexp = Regex.EMAIL)
    private String email;

    @Pattern(regexp = Regex.PHONE)
    private String phone;
    private String name;
    private LocalDateTime blockedUntil = LocalDateTime.now();
    private int mannerDegree = 37;


    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    /**
     * userDTO -> userEntity
     */
    public static UserEntity toUserEntity(UserDTO userDTO) {
        return UserEntity.builder()
                .username(userDTO.getUsername())
                .password(Password.passwordEncoding(userDTO.getPassword()))
                .nickname(userDTO.getNickname())
                .blockedUntil(userDTO.getBlockedUntil())
                .profileImageUrl(userDTO.getProfileImageUrl())
                .email(userDTO.getEmail())
                .name(userDTO.getName())
                .phone(userDTO.getPhone())
                .role(UserRole.GENERAL)
                .mannerDegree(userDTO.getMannerDegree())
                .build();
    }

    /**
     * kakaoInfo -> userEntity
     */
    public static UserEntity kaKaoInfoToUserEntity(UserDTO userDTO) {
        return UserEntity.builder()
                .username("kakao_" + userDTO.getEmail())
                .password("kakao_password")
                .nickname(userDTO.getNickname())
                .blockedUntil(userDTO.getBlockedUntil())
                .profileImageUrl(userDTO.getProfileImageUrl())
                .email(userDTO.getEmail())
                .name("kakao_" + userDTO.getNickname())
                .phone("kakao_phone_number")
                .role(UserRole.GENERAL)
                .mannerDegree(userDTO.getMannerDegree())
                .build();
    }

    public UserDTO(String email, String profileImageUrl, String nickname) {
        this.email = email;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }

}
