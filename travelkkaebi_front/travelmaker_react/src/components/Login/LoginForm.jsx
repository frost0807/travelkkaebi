import React, { useEffect } from 'react';
import axios from 'axios';
import Logo from '../../images/basicLogo.png';
import kakaoLogin from '../../images/Login_IMG/kakao_login_medium_wide.png';
import './css/LoginForm.css';
import { API_BASE_URL } from '../../config';
import {
  FormBox,
  InputBox,
  InputField,
  FormFooter,
  Btn,
  SnsLine
} from './Loginstyle';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { KAKAO_AUTH_URL } from './KakaoAuth';
import { setNickname, setProfile, setToken, setUsername } from '../../util';


function LoginForm({ close }) {

  const navi = useNavigate();
  const moveMain =() => {
    navi("/")
  }

  // 카카오 로그인 이벤트 함수
  function kakaoLoginEvent () {
    window.location.href = KAKAO_AUTH_URL
  }
  // 일반 로그인
  function login(userDTO) {
    axios.post(
      API_BASE_URL + '/singin',
      userDTO
    )
      .then(res => {
        console.log(res.data);
            // 토큰 키 이름 이대로 ?
            localStorage.setItem("ACCESS_TOKEN", res.data.token);
            localStorage.setItem('username', res.data.username);
            // role 
            close();
      })
      .catch ( error => {
        console.log(error);
        console.log(userDTO);
        alert("ID 또는 비밀번호가 틀립니다.");
      })
  }

  /** Block (정지) 된 User 로그인 못하게 함 */


  // 관리자 로그인시 ? ?
  

  const formSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    login({ username: username, password: password });
  }

  // useEffect 사용
  useEffect(() => {
    axios.get('modal이 오픈 되기 전 url',
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN")
        }
      }
    )
      .then(res => {
        console.log(res)
      })
  }, [])

  // token 인증하는 것도 변수로 저장



  return (

    <FormBox>
      <form onSubmit={formSubmit} className="loginform">
        <img alt="도깨비" src={Logo} style={{ width: '100px' }} />

        <Typography component='h1' variant='h5'>
        <p style={{ margin: '5px', color:'#ccc' }}> 로그인</p>
      </Typography>
        <InputBox>
          <InputField
            className='InputField'
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            required
            maxLength='16'
          />
          <label>아이디</label>
        </InputBox>

        <InputBox>
          <InputField
            className='InputField'
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            required
            maxLength='16'
          />
          <label>비밀번호</label>
        </InputBox>

        <div style={{ marginTop: '40px' }}>
          <Btn
            className='Formbtn'
            type="submit"
            onClick={console.log("login btn evnt!")}
          >LOGIN
          </Btn>
        </div>
        <FormFooter>
          <a href="/forgotPassword">Forgot Password? </a>
          /
          <a href="/register"> Register</a>
        </FormFooter>

      <SnsLine>
        SNS
      </SnsLine>
      <div className='sns_log'>
        <button type='button' onClick={ kakaoLoginEvent } >
          <img alt='카카오로그인'
            src={ kakaoLogin } />
        </button>
      </div>

      </form>
    </FormBox>
  );
};

export default LoginForm;