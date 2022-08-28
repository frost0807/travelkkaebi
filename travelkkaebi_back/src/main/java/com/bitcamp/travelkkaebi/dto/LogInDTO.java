package com.bitcamp.travelkkaebi.dto;

import com.bitcamp.travelkkaebi.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogInDTO {
    private int id;
    private String username;
    private String password;
    private String token;
    private UserRole role;
    private int mannerDegree;
    private String nickname;
    private String profileImageUrl;
    private String email;
}
