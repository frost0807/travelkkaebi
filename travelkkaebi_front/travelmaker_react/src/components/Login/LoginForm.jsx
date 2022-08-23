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
import { setNickname, setProfile, setToken, setUsername } from '../../util';


function LoginForm({ close }) {

  const navi = useNavigate();
  const moveMain =() => {
    navi("/")
  }

  /**카카오의 SDK를 react에서 활용하려면 window 객체를 사용해야 한다.
그렇지 않으면 Kakao가 정의되지 않았다는 에러가 발생한다. */
  // 카카오 로그인 이벤트 함수
  function kakaoLoginEvent () {
    window.Kakao.Auth.login({
      
      //받아오고 싶은 정보
       // 다람쥐님과 아직 상의 X [ 근데 이거 이외의 정보는 노필요한 것 같음 ]
       // 관리하기도 귀찮음 ..
      scope: 'profile_nickname, profile_image, account_email, gender',
      //로그인 후 실행되는 코드(res=받아온데이터)
      success: function (res) {
        //console.log(res);

        // 로그인한 user 정보 불러오기
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            console.log(JSON.stringify(res));

            // kakao user 정보 변수에 저장
            const username = res.id;
            const email = res.kakao_account.email;
            const token = res.access_token;
            const profile_img = res.properties.profile_image;
            const nickname = res.properties.nickname;

            // 카카오로 로그인한 유저의 정보가 DB에 없을 시에 저장

            axios.get( API_BASE_URL+'/샬라샬라~', username ).then(res => {
              if ( res.data === false ) {
                axios
                  .post(API_BASE_URL+'/signin/kakao', {
                    username: username,
                    password: username,
                    email: email,
                    profile_img_url: profile_img,
                    nickname: nickname,
                  })
                  .then(res => {
                    // 회원가입 후 회원정보 저장  여기서 authenticate url 호출하면 될 것 같기는 함..
                    setUsername(username);
                    setToken(token);
                    setProfile(profile_img);
                    setNickname(nickname);
                    moveMain();
                  });
              } else {
                //로컬스토리지에 저장
                // 로그인 성공한 후의 기능? (로그인 이벤트가 발생했던 페이지로 callback?)
                setUsername(username);
                setToken(token);
                setProfile(profile_img);
                setNickname(nickname);
              }
            });
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
    });
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
            close();
      })
      .catch ( error => {
        console.log(error);
        alert("ID 또는 비밀번호가 틀립니다.");
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