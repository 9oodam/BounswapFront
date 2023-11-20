import React from "react";
import { Divstyle, Textstyle } from "./AddLiquidity.style";
import InputToken from "./InputToken";
import LiquidiityBtn from "../LiquidiityBtn";
import useWeb3 from "src/hooks/web3.hook";

// const AddLiquidity:React.FC<Display> = ({display}) => {
const AddLiquidity = () => {
  const { user, web3, dataContract, governanceContract } = useWeb3(
    window.ethereum
  );
  console.log("dataContract:", dataContract);
  if (dataContract) {
    console.log("💔💔💔💔💔💔💔💔💔💔", dataContract.methods);
  }

  const minting = async () => {
    if (web3 && dataContract) {
      const amountEth = web3.utils.toWei("5", "ether");
      const data = await (dataContract.methods._mint as any)(user.account, amountEth).send({ from: user.account });


      console.log(await (dataContract.methods.balanceOf as any)(user.account).call());
    }
  };

  console.log("10000000000000000000n", web3?.utils.fromWei(web3.utils.toBigInt(10000000000000000000n), "ether"));
  return (
    // <div className={`${display} flex-col items-center p-5`}>
    <div className={Divstyle.flex}>
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>0</span>
      </div>
      <InputToken tokenName={"ETH"} />
      {/* <Balance></Balance> */}
      <div className={Divstyle.box}>
        Balance: <span className={Textstyle.balance}>0</span>
      </div>
      <InputToken tokenName={"USDT"} />
      <LiquidiityBtn tokenName={"Add Liquidity"}></LiquidiityBtn>
      <div onClick={minting}>minting</div>
    </div>
  );
};

export default AddLiquidity;
