let url_1;
let url_2;
let host;

const hostname = window && window.location && window.location.hostname;
if (hostname == 'localhost') {
  url_1 = "http://localhost:8080";
  url_2 = "http://localhost:8080"; // 임시 
}

  host = url_1;

export const API_BASE_URL = `${host}`; 