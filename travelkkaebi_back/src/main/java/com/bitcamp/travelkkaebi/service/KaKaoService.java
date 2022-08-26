package com.bitcamp.travelkkaebi.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


@Service
public class KaKaoService {

    private final String GRANT_TYPE = "authorization_code";
    private final String CLIENT_ID = "7885d8a4bb6d5b564863fbf38ee1a72b";
    private final String REDIRECT_URI = "http://127.0.0.1:5500/kakaotest/kakaotest.html";
    private final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";

    public String kaKaoAuth(String authorizeCode) {

        String access_Token = getAccessToken(authorizeCode);    // 인가코드를 통해 토큰발급


        // 토큰을 이용해 회원 정보 가져오기
     /*   HashMap<String, Object> userInfo = getUserInfo(access_Token);
        System.out.println("------- access_Token ------- : " + access_Token);
        System.out.println("------- userInfo ------- : " + userInfo.get("email"));    // 회원 이메일
        System.out.println("------- nickname ------- : " + userInfo.get("nickname"));    // 회원 이름*/

        // 가져온 회원 정보 DB에 넣어 회원가입 시키기
      /*  UserVO userVO = new UserVO();
        String kakao_email = (String) userInfo.get("email"); // 회원 아이디
        String kakao_nickname = (String) userInfo.get("nickname");   // 회원 이름
        System.out.println(kakao_nickname);

        // 만약 DB에 해당 회원의 ID가 없다면 회원가입 시키기
        if (!userService.checkId(kakao_email)) {
            log.info("유저 회원가입");
            userVO.setUserId(kakao_email);
            userVO.setUserName(kakao_nickname);
            userService.joinKakao(userVO);
        }*/
        // 만약 이미 회원가입 된 회원이라면? 로그인하기
//        HttpSession session = req.getSession(); // session 생성
//        session.setAttribute("sessionU", kakao_email); //session 저장하기

        return null; //본인 원하는 경로 설정
    }

    // kakao create token
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

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            return responseEntity.getBody();
        }
        return "error";
    }
}
