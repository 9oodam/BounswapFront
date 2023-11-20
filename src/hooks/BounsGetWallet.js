import React, { useState, useEffect } from "react";
// import useVerifyToken from "./useVerifyToken";
import { verifyToken } from "src/Service/authService";

const BounsGetWallet = () => {
  //   const { resSuccess, token } = useVerifyToken();
  const [accessToken, setAccessToken] = useState(null);
  const [didToken, setDidToken] = useState();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    console.log("address", address);
  }, [address]);

  // localstorage 에서 accesstoken 가져와서 검증
  const test1 = async () => {
    const test = await verifyToken();
    console.log("test 6767", test);
    if (test.testTrue) {
      setAccessToken(test.accessToken);
    //   createDidToken();
    }
  };

  useEffect(() => {
    test1();
  }, []);

  // DID 토큰 생성 로직 추가
  const createDidToken = () => {
    fetch(`https://bouns.io/api/create-did-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    }).then(async (res) => {
      const result = await res.json();
      console.log("result", result);
      //   alert(result);
      if (res.status == 200) {
        setDidToken(result);
        // verifyDidToken();
      }
    });
  };

  // did 토큰 검증 후 wallet 주소 받아오기
  const verifyDidToken = () => {
    fetch(`https://bouns.io/api/verify-did-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: didToken,
      }),
    }).then(async (res) => {
      const result = await res.json();
      // const result = await res.data;
      console.log("res :", res);
      // console.log("data :", res.data);
      console.log("json :", result);
      const iss = result?.iss;
      const walletAddress = iss.split(":")[2];
      setAddress(walletAddress);
      //   alert(walletAddress);
    });
  };
  console.log("gg", address);
  return address;
};

export default BounsGetWallet;
