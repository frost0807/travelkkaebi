let url_1;
let url_2;
let url_3;
let url_4;

let host;

const hostname = window && window.location && window.location.hostname;
if (hostname == "localhost") {
  url_1 = "http://localhost:8080";
  url_2 = "http://192.168.0.4:8080/travelkkaebi"; // 임시
  url_3 = "http://192.168.0.33:8080"; // tomato 9층일때 http://192.168.0.195:8080 , 7층일때 http://192.168.0.33:8080
  url_4 = "http://localhost:8080"; // tomato 셀프 서버
}

host = url_4;

export const API_BASE_URL = `${host}`;

export const likedislike = API_BASE_URL + "/likeordislike";
export const userconfig = API_BASE_URL + "/travelkkaebi";
export const joinmeurl = API_BASE_URL + "/joinme";
export const pickupurl = API_BASE_URL + "/pickupme";
export const imgurl = API_BASE_URL + "/image";
export const mytravel = API_BASE_URL + "/mytravel";
export const regionevent = API_BASE_URL + "/region/event";
export const editorchoice = API_BASE_URL + "/editorchoice";
