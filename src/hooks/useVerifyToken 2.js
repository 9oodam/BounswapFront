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
      // console.log("data", data);

      // console.log("data", data);
      // if (data.status == 200) {
      //   console.log("sdfsdfsdfsdfs");
      //   setResSuccess(true);
      // }
      // const data = await testFunc();
      // fetch(
      //   `https://bouns.io/api/jwt-verify?token=${token}&projectId=${projectId}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // )
      // .then((res) => {
      //   console.log("res:", res);
      //   setResSuccess(true);
      //   // const result = await res.json();
      //   // console.log("result :", result); result.email 에서 받을수 있는거 사용자 email 주소
      //   return res.status == 200;
      // })
      // .then((login) => {
      //   if (login) {
      //     console.log("옴?");
      //     // setResSuccess(true);
      //   } else {
      //     console.log("removeee");
      //     localStorage.removeItem("accessToken"); // 토큰 제거
      //     localStorage.removeItem("loggedIn"); // 로그인 지우기
      //     window.location.href = "/poolpair"; // 로그인 페이지로 리다이렉트
      //   }
      // })
      // .catch((error) => {
      //   console.error("Token verification error:", error);
      // });
    }

    // testFunc();
  }, []);
  // }, []);

  useEffect(() => {
    console.log("resSuccess", resSuccess);
  }, [resSuccess]);

  return { resSuccess: test, token };
};

export default useVerifyToken;
