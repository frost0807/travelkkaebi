package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.dto.UserDTO;
import com.bitcamp.travelkkaebi.entity.UserEntity;
import com.bitcamp.travelkkaebi.repository.UserRepository;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Objects;


@Service
@RequiredArgsConstructor
public class KaKaoService {

    private final UserRepository userRepository;

    private final String GRANT_TYPE = "authorization_code";
    private final String CLIENT_ID = "7885d8a4bb6d5b564863fbf38ee1a72b";
    private final String REDIRECT_URI = "http://127.0.0.1:5500/kakaotest/kakaotest.html";
    private final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";

    public String kaKaoAuth(String authorizeCode) {
        // 인가코드를 통해 토큰발급
        String accessToken = getAccessToken(authorizeCode);

        // accessToken 을 이용하여 JSON 형태의 KAKAO_USER_INFO
        String kaKaoUserInfo = getUserInfoByAccessToken(accessToken);

        // json 형태의 userinfo parsing
        jsonParsingAndSave(kaKaoUserInfo);

        return "whdcks";
    }

    private void jsonParsingAndSave(String userInfoByAccessToken) {
        JsonElement element = JsonParser.parseString(userInfoByAccessToken);
        String nickname = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
        String profile_image = element.getAsJsonObject().get("properties").getAsJsonObject().get("profile_image").getAsString();
        String email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();

        UserDTO userDTO = new UserDTO(email, profile_image, nickname);
        UserEntity kaKaoLoginUser = UserDTO.kaKaoInfoToUserEntity(userDTO);

        userRepository.save(kaKaoLoginUser);
    }

    /**
     * authorizeCode 를 이용해 KaKaoServer -> access token 가져오기
     */
    private String getAccessToken(String authorizeCode) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity request = new HttpEntity(headers);

        UriComponentsBuilder uriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(TOKEN_URL)
                .queryParam("grant_type", GRANT_TYPE)
                .queryParam("client_id", CLIENT_ID)
                .queryParam("redirect_uri", REDIRECT_URI)
                .queryParam("code", authorizeCode);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                uriComponentsBuilder.toUriString(),
                HttpMethod.POST,
                request,
                String.class
        );

        /**
         * HttpStatus -> 200 true
         * json 형태의 response -> parse
         */
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            JsonObject parser = JsonParser.parseString(Objects.requireNonNull(responseEntity.getBody())).getAsJsonObject();
            return parser.getAsJsonObject().getAsJsonPrimitive("access_token").getAsString();
        }
        return "error";
    }

    /**
     * accessToken 을 이용해 KaKaoServer 로 회원정보 받아오기
     */
    private String getUserInfoByAccessToken(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        return restTemplate.postForObject("https://kapi.kakao.com/v2/user/me", request, String.class);
    }


}