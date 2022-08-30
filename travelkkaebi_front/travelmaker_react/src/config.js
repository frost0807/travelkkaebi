let url_1;
let url_2;
let host;

const hostname = window && window.location && window.location.hostname;
if (hostname == "localhost") {
  url_1 = "http://localhost:8080/travelkkaebi";
  url_2 = "http://192.168.0.4:8080/travelkkaebi"; // 임시
}

host = url_2;

export const API_BASE_URL = `${host}`;
