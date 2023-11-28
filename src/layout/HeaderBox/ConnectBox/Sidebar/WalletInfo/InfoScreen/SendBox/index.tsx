import React, { useEffect, useState } from "react";
import useWeb3 from "src/hooks/web3.hook";

const SendBox = () => {
  const { user, web3 } = useWeb3(null);
  const [amount, setAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");

  // send 함수
  const send = async () => {
    try {
      if (!amount || !sendAddress) {
        alert("보낼 금액과 주소 입력하세요.");
        return;
      }
      const confirm = window.confirm(
        `${sendAddress}로 ${amount}bnc 송금하시겠습니까?`
      );
      if (!confirm) return;

      // await window.ethereum.enable();

      const result = await web3?.eth.sendTransaction({
        from: user.account,
        to: sendAddress,
        value: web3?.utils.toWei(amount, "ether"),
      });

      if (result?.status == 1) {
        setAmount("");
        setSendAddress("");
      }

      console.log("result", result);
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <label>금액</label>
        </div>
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div>
          <label>보낼 주소</label>
        </div>
        <input
          onChange={(e) => {
            setSendAddress(e.target.value);
          }}
          value={sendAddress}
        />
      </div>
      <button
        onClick={() => {
          send();
        }}
        className="mt-4 w-[80px] bg-green-200 p-2 rounded-md"
      >
        send
      </button>
    </>
  );
};

export default SendBox;
