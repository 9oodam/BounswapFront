const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";
const accessToken = localStorage.getItem("accessToken");

// 토큰 검증
export const verifyToken = async () => {
  return fetch(
    `https://bouns.io/api/jwt-verify?token=${accessToken}&projectId=${projectId}`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {

    const result = await res.json();
    if (res.status == 200) {
      return { testTrue: res.status == 200, accessToken };
    }
  });
};

// 로그인 URL을 생성하는 함수
export const getLoginUrl = (): string => {
  const redirectUri = window.location.protocol + "//" + window.location.host;
  const queryString = new URLSearchParams({
    client_id: projectId,
    redirect_uri: redirectUri,
  }).toString();
  return `https://mrlogin.io/login?${queryString}`;
};
