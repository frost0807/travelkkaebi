import axios, { Axios } from "axios";

export const bearerToken = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
  },
};

export const headerConfig = {
  Headers: {
    "content-type": "multipart/form-data",
  },
};

export const headerImg_tk = {
  headers: {
    "content-type": "application/json; charset = utf-8",
    Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
  },
};

const token = localStorage.getItem("ACCESS_TOKEN");
export const is_logged = token ? true : false;
export const getUserNickname = localStorage.getItem("nickname");

export const setUsername = (username) => {
  return localStorage.setItem("username", username);
}; // ID = username
export const setNickname = (nickname) => {
  return localStorage.setItem("nickname", nickname);
};
export const setProfile = (profile_img) => {
  return localStorage.setItem("profile_img_url", profile_img);
}; // 리액트에선 profile_img 로 통일
export const setToken = (token) => {
  return localStorage.setItem("ACCESS_TOKEN", token);
};

export const getUsername = () => {
  return localStorage.getItem("usename");
}; // ID = username
export const getNickname = () => {
  return localStorage.getItem("nickname");
};
export const getProfile = () => {
  return localStorage.getItem("profile_img_url");
}; // 리액트에선 profile_img 로 통일
export const getToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
};

export const removeAuthority = () => {
  return localStorage.removeItem("authority");
};
export const clearLocal = () => {
  return localStorage.clear();
};

//  joinme, pickme 필터링 value
export const buttons = [
  {
    name: "전체",
    value: "전체",
  },
  {
    name: "강원",
    value: "강원",
  },
  {
    name: "경기",
    value: "경기",
  },
  {
    name: "제주",
    value: "제주",
  },
  {
    name: "서울",
    value: "서울",
  },
  {
    name: "충북",
    value: "충북",
  },
  {
    name: "충남",
    value: "충남",
  },
  {
    name: "인천",
    value: "인천",
  },
  {
    name: "전북",
    value: "전북",
  },
  {
    name: "전남",
    value: "전남",
  },
  {
    name: "경남",
    value: "경남",
  },
  {
    name: "경북",
    value: "경북",
  },
];
