import { useEffect, useState } from "react";

const projectId = "6e9c40d1-1236-42c4-8a13-586e7df92327";

// 토큰을 검증하는 함수
const useVerifyToken = () => {
  const [resSuccess, setResSuccess] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [test, settest] = useState(null);

  useEffect(() => {
    if (token) {
      const testFunc = async () => {
        const data = await fetch(
          `https://bouns.io/api/jwt-verify?token=${token}&projectId=${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        if (data.status == 200) {
          console.log(200);
          setResSuccess(true);
        }
        settest(data.status);
        return data;
      };
      testFunc();
    }
  }, []);

  useEffect(() => {
    console.log("");
  }, [resSuccess]);

  return { resSuccess: test, token };
};

export default useVerifyToken;
