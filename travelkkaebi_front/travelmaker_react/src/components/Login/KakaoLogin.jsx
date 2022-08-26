import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { API_BASE_URL } from '../../config';
import { setNickname, setProfile, setToken, setUsername } from '../../util';
import { code } from './KakaoAuth';

function KakaoLogin() {

  const navigate = useNavigate();

  useEffect (() => {
    axios.get( API_BASE_URL+"/auth/kakao", { params: { code: code }} )
    .then( res => {
      console.log(res.data)
      setToken(res.data.token);
      setUsername(res.data.username);
      setNickname(res.data.nickname);
      setProfile(res.data.profile_img);
      navigate("/");
    });
  },[]);

  return (

    <>
    </>

  )
}

export default KakaoLogin