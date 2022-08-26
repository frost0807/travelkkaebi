
const setUsername = username => {
  return localStorage.setItem('username', username);
}; // ID = username
const setNickname = nickname => {
  return localStorage.setItem('nickname', nickname);
};
const setProfile = profile_img => {
  return localStorage.setItem('profile_img_url', profile_img);
}; // 리액트에선 profile_img 로 통일
const setToken = token => {
  return localStorage.setItem("ACCESS_TOKEN",token);
}

const getUsername = () => {
  return localStorage.getItem('usename');
}; // ID = username
const getNickname = () => {
  return localStorage.getItem('nickname');
};
const getProfile = () => {
  return localStorage.getItem('profile_img_url');
}; // 리액트에선 profile_img 로 통일
const getToken = () => {
  return localStorage.getItem("ACCESS_TOKEN");
}

const removeAuthority = () => {
  return localStorage.removeItem("authority");
}
const clearLocal = () => {
  return localStorage.clear();
}


export {
  setUsername, setNickname, setProfile, setToken,
  getUsername, getNickname, getProfile, getToken,
  removeAuthority,
  clearLocal
}