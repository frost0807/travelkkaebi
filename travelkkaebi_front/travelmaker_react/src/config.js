let url_1;
let url_2;
let host;

const hostname = window && window.location && window.location.hostname;
if (hostname == 'localhost') {
  url_1 = "http://192.168.0.195:8080";  // 9층일때 http://192.168.0.195:8080 , 7층일때 http://192.168.0.33:8080
  url_2 = "http://localhost:8080"; // 임시 
}

  host = url_1;

export const API_BASE_URL = `${host}`; 