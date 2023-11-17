import axios from "axios";
const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";

// 토큰을 검증하는 함수
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(
      `https://bouns.io/api/jwt-verify?token=${token}&projectId=${projectId}`
    );

    // const response = await fetch(
    //   `https://bouns.io/api/jwt-verify?token=${token}&projectId=${projectId}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    const result = await response.data;
    console.log("authService.ts > result :", result);

    return response.status === 200;
  } catch (error) {
    console.error("Token verification error:", error);
    return false;
  }
};

// 토큰 검증
// export const verifyToken = async (token: string): Promise<boolean> => {
//   try {
//     const response = await axios.get(
//       `https://bouns.io/api/jwt-verify?token=${token}&projectId=${projectId}`
//     );

//     // Token verification successful
//     console.log("authService.ts > result :", response.data);
//     return response.status === 200;
//   } catch (error) {
//     console.error("Token verification error:", error);

//     // Token verification failed, handle the error
//     if (error.response && error.response.status === 401) {
//       // Handle token invalidation here
//       localStorage.removeItem("accessToken"); // 토큰 제거
//       localStorage.removeItem("loggedIn");    // 로그인 상태 제거
//       window.location.href = "/login";        // 로그인 페이지로 리다이렉트
//     }

//     return false;
//   }
// };

// 로그인 URL을 생성하는 함수
export const getLoginUrl = (): string => {
  const redirectUri = window.location.protocol + "//" + window.location.host;
  const queryString = new URLSearchParams({
    client_id: projectId,
    redirect_uri: redirectUri,
  }).toString();
  return `https://mrlogin.io/login?${queryString}`;
};
