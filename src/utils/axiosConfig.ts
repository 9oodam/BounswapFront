import axios from "axios";
import { error } from "console";
import { verifyToken } from "src/Service/authService";

const axiosInstance = axios.create({
  baseURL: "https://locallhost:3000", // 배포시 수정
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // 로컬 스토리지에서 accessToken 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      // 요청 헤더에 accessToken 추가
      config.headers["Authorization"] = `Bearer ${token}`;
      // 토큰 유효성 검증
      const isValid = await verifyToken(token);
      console.log("axios request isValid :", isValid);

      if (!isValid) {
        // 토큰이 유효하지 않은 경우 처리
        localStorage.removeItem("accessToken"); // 토큰 제거
        localStorage.removeItem("loggedIn"); // 로그인 지우기
        window.location.href = "/poolpair"; // 로그인 페이지로 리다이렉트
      }
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("axios response :", response);

    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loggedIn");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
