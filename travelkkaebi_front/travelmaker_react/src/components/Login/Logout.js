const logout = () => {
  let token = localStorage.getItem('ACCESS_TOKEN')

  // 전부 지워버림
  localStorage.clear()
  window.location.replace('http://localhost:3000/')
}


// 카카오 로그아웃
/*
window.Kakao.init('본인 JAVASCRIPT API 키');
	function kakaoLogout() {
    	if (!Kakao.Auth.getAccessToken()) {
		    console.log('Not logged in.');
		    return;
	    }
	    Kakao.Auth.logout(function(response) {
    		alert(response +' logout');
		    window.location.href='/'
	    });
};
출처: https://triplexlab.tistory.com/55 [트리플엑스랩 | TriplexLab:티스토리]
*/
export default logout