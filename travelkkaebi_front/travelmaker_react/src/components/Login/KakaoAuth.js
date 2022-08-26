const REST_API_KEY= '	9c54ac4957e422413a5ff627ad6e9b55'
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// const setKakaToken = Kakao.Auth.setAccessToken(ACCESS_TOKEN);

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

export {
  REDIRECT_URI,
  KAKAO_AUTH_URL,
  code,
}