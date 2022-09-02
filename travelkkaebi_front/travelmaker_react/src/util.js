export const bearerToken = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
  },
};

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
