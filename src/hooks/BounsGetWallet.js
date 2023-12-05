import { verifyToken } from "src/Service/authService";

const BounsGetWallet = async () => {
  let address;

  const test = await verifyToken();

  // DID 토큰 생성 로직 추가
  const createDidToken = async (accessToken) => {
    console.log("accessToken?", accessToken);

    const res = await fetch(`https://bouns.io/api/create-did-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
      }),
    });
    const result = await res.json();
    if (res.status == 200) {
      await verifyDidToken(result);
    }
  };

  // did 토큰 검증 후 wallet 주소 받아오기
  const verifyDidToken = async (didToken) => {
    const res = await fetch(`https://bouns.io/api/verify-did-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: didToken,
      }),
    });

    const result = await res.json();
    const iss = result?.iss;
    const walletAddress = iss.split(":")[2];
    address = walletAddress;
  };

  if (test.testTrue) {
    const accessToken = test.accessToken;

    await createDidToken(accessToken);
    if (address) return address;
  }
};

export default BounsGetWallet;
