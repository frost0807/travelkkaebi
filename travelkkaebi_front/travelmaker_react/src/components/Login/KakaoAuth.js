const REST_API_KEY = 'http://localhost:8080'
const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const setKakaToken = Kakao.Auth.setAccessToken(ACCESS_TOKEN);

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

export {
  REST_API_KEY,
  REDIRECT_URI,
  KAKAO_AUTH_URL,
  setKakaToken,
  code,
  scope
}