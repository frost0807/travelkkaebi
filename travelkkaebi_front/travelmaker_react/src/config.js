let url_1;
let url_2;
let host;

const hostname = window && window.location && window.location.hostname;
if (hostname == 'localhost') {
<<<<<<< HEAD
  url_1 = "http://localhost:8080/travelkkaebi";
  url_2 = "http://192.168.0.4:8080/travelkkaebi"; // 임시 
=======
  url_1 = "http://192.168.0.195:8080";  // 9층일때 http://192.168.0.195:8080 , 7층일때 http://192.168.0.33:8080
  url_2 = "http://localhost:8080"; // 임시 
>>>>>>> d09d1e86dfe22c5848693c8b222aaa49680ef1c6
}

  host = url_2;

export const API_BASE_URL = `${host}`; 