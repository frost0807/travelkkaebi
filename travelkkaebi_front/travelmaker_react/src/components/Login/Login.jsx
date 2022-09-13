import React, { useEffect, useRef } from "react";
import axios from "axios";
import Logo from "../../images/basicLogo.png";
import kakaoLogin from "../../images/Login_IMG/kakao_login_medium_wide.png";
import "./css/LoginForm.css";
import { API_BASE_URL } from "../../config";
import {
  FormBox,
  InputBox,
  InputField,
  FormFooter,
  Btn,
  SnsLine,
  ModalContainer,
  Closebtn,
  Backgr,
  Dimmed,
} from "./Loginstyle";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { KAKAO_AUTH_URL } from "./KakaoAuth";
import { useRecoilState } from "recoil";
import { isLoginModalState, isLoginState } from "../../recoil/atom";

function Login() {
  const navi = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginState);

  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);

  const ref = useRef(null);

  // useEffect(() => {
  //   document.addEventListener("mousedown", onClickModalOutSide);
  //   return () => {
  //     document.removeEventListener("mousedown", onClickModalOutSide);
  //   };
  // });

  const onClickModalOutSide = () => {
    setIsLoginModalOpen(false);
  };

  const onClosed = () => {
    setIsLoginModalOpen(false);
  };

  /**카카오의 SDK를 react에서 활용하려면 window 객체를 사용해야 한다.
그렇지 않으면 Kakao가 정의되지 않았다는 에러가 발생한다. */
  // 카카오 로그인 이벤트 함수
  function kakaoLoginEvent() {
    window.location.href = KAKAO_AUTH_URL;
  }

  // 일반 로그인
  function login(userDTO) {
    axios
      .post(API_BASE_URL + "/travelkkaebi/signin", userDTO) //API_BASE_URL + "/travelkkaebi/signin"
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("ACCESS_TOKEN", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("profileImageUrl", res.data.profileImageUrl);
        localStorage.setItem("manner", res.data.mannerDegree);
        localStorage.setItem("nickname", res.data.nickname);
        localStorage.setItem("role", res.data.role);
        setIsLoggedIn(true);
        // role
        alert("👹 로그인 되었습니다. ");
        window.location.reload();
        navi("/");
      })
      .catch((error) => {
        console.log(error);
        console.log(userDTO);
        alert("ID 또는 비밀번호가 틀립니다.");
      });
  }

  /** Block (정지) 된 User 로그인 못하게 함? */

  // 관리자 로그인시 ? ?

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    login({ username: username, password: password });
  };

  // stopPropagation
  // 감싸고 있는 부모요소에도 이벤트가 발동되는 걸 (이벤트버블링) 막기 위해
  // 이벤트 전파를 막고 싶은 요소에 넣는다.
  // 참고사이트 https://velog.io/@tlatjdgh3778/React%EC%97%90%EC%84%9C-Modal-%EA%B5%AC%ED%98%84

  return (
    <Backgr>
      <Dimmed onClick={onClickModalOutSide}> </Dimmed>
      <ModalContainer isLoginModalOpen={isLoginModalOpen} ref={ref}>
        <FormBox>
          <form onSubmit={formSubmit} className="loginform">
            <img alt="도깨비" src={Logo} style={{ width: "100px" }} />

            <Typography component="h1" variant="h5">
              <p style={{ margin: "5px", color: "#ccc" }}> 로그인</p>
            </Typography>
            <InputBox>
              <InputField
                className="InputField"
                type="text"
                id="username"
                name="username"
                autoComplete="off"
                required
                maxLength="16"
              />
              <label>아이디</label>
            </InputBox>

            <InputBox>
              <InputField
                className="InputField"
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                required
                maxLength="16"
              />
              <label>비밀번호</label>
            </InputBox>

            <div style={{ marginTop: "40px" }}>
              <Btn
                className="Formbtn"
                type="submit"
                onClick={console.log("login btn evnt!")}
              >
                LOGIN
              </Btn>
            </div>
            <FormFooter>
              <a href="/forgotPassword">Forgot Password? </a>/
              <a href="/register"> Register</a>
            </FormFooter>

            <SnsLine>SNS</SnsLine>
            <div className="sns_log">
              <button type="button" onClick={kakaoLoginEvent}>
                <img alt="카카오로그인" src={kakaoLogin} />
              </button>
            </div>
          </form>
        </FormBox>
        <Closebtn onClick={onClosed} />
      </ModalContainer>
    </Backgr>
  );
}

export default Login;
