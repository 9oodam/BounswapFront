import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";

import { getPairAmount } from "src/features/pair/poolSendFeatures";

import { Divstyle, Textstyle } from "./AddLiquidity.style";
import InputToken from "./InputToken";
import LiquidiityBtn from "../LiquidiityBtn";
import { TokenPair } from "src/Interface/Token.interface";

const AddLiquidity:React.FC<TokenPair> = ({token0, token1}) => {
  const queryClient = useQueryClient();
  const { user, web3, pairContract } = useWeb3(
    window.ethereum
  );

  const [tokenInputAmount, setTokenInputAmount] = useState<string>('');
  const [tokenOutputAmount, setTokenOutputAmount] = useState<string>('');
  const [token0Amount, setToken0Amount] = useState<BigInt>(0n);
  const [token1Amount, setToken1Amount] = useState<BigInt>(0n);

  const getPairAmountData = async () => {
    if(pairContract) {
      const amount = await getPairAmount(
        pairContract,
        '0xE10af94a19364BcA10C80c454938BfFD9FF453c7',
        '0x5AD8ee81F79b04DCCEb954b6695b1e38E2c60fE8',
        200000000000000000000n
      )
      console.log(amount);
    }
  }

  useEffect(() => {
    console.log(tokenInputAmount)
  }, [tokenInputAmount])


  // console.log(
  //   "10000000000000000000n",
  //   web3?.utils.fromWei(web3.utils.toBigInt(10000000000000000000n), "ether")
  // );
  return (
    // <div className={`${display} flex-col items-center p-5`}>
    <div className={Divstyle.flex}>
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>0</span>
      </div>
      <InputToken tokenName={token0} />
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>0</span>
      </div>
      <InputToken tokenName={token1} />
      <LiquidiityBtn tokenName={"Add Liquidity"}></LiquidiityBtn>
      <div onClick={() => {getPairAmountData()}}>chk</div>
    </div>
  );
};

export default AddLiquidity;
