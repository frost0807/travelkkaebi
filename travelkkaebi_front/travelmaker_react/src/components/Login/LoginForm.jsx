import React, { useEffect } from 'react';
import axios from 'axios';
import Logo from '../../images/basicLogo.png';
import './css/LoginForm.css';
import {
  FormBox,
  InputBox,
  InputField,
  FormFooter,
  Btn
} from './Loginstyle';
import { Alert, Typography } from '@mui/material';


// react 함수형 컴포넌트 어떻게 할 지 정하기
// axios 문법 정하기
// 전송 변수 : res ? response ?
// url 변수
// JWT 관리하기 ( Redux ? zustand ? ) 이유 : 상태 끌어올리기가 헷갈리고 귀찮아서
/* localStorage에 토큰 저장? sessionStorage? cookie ?
   만약 cookie에 저장한다면 withCredentials
    ( 쿠키에 저장하는 일은 드물지만 알아두면 나쁘진 않을테니 )
*/
// 공통 css className 정하기 ( global css )
// scss? css ?
// bootstrap mui 는 사용 그 외 ui 라이브러리 정하기
// arrowFunction () 생략?
// {} 사용 시 앞 뒤 한칸씩 띄어쓰기
// apiConfig 파일을 하나 만들어서 export로 여러곳에서 사용하는 걸 추천
/* 
accessToken은 인증용 토큰 
refreshToken은 만료된 토큰을 갱신하기 위해 사용하는 토큰
*/


const LoginForm = ({ close }) => {

  // url은 임시로 저장
  function login(userDTO) {
    axios.post(
      'http://localhost:8080/auth/signin',
      userDTO
    )
      .then(res => {
        // console.log(response.data);
        if (res.data === false) {
          console.log(res.data);
          Alert("아이디 또는 비밀번호가 맞지 않습니다.")
        } else {
            // 토큰 키 이름 ?
            localStorage.setItem("ACCESS_TOKEN", res.data.token);
            close();
        }
      })
  }

  // 로그아웃 로직
  // 로그아웃을 눌렀을 경우에만, 토큰을 삭제?
  /*
  localStorage.removeItem("ACCESS_TOKEN");
  */

  // 존재하지 않는 아이디 or 틀린 비밀번호를 입력했을 시
  /* if (res.data.userDTO == ??) {
    alert("아이디 혹은 비밀번호가 틀렸습니다.")
  }
*/

  // block 된 user가 로그인 시
  /* 
    if (res.data.userDTO == ??) {
      alert("??일 정지되었습니다.")
    }
  */

  // 관리자 로그인시 ?
  

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
      </form>
    </FormBox>
  );
};

export default LoginForm;