import React from "react";
import CoinImg from "src/components/CoinImg";
import { Divstyle, Textstyle } from "./CoinBox.style";

const index = ({
  amount,
  symbol,
  dollar,
}: {
  amount: number;
  symbol: string;
  dollar: number;
}) => {
  return (
    <div className={Divstyle.coinBox}>
      <CoinImg></CoinImg>
      <div className={Divstyle.coinDiv}>
        <div className={Divstyle.coinFlex}>
          {/* 금액 */}
          <div className={Textstyle.amountSize}>{amount}</div>
          {/* 심볼 */}
          <div>{symbol}</div>
        </div>
        {/* 현재시세 */}
        <div className={Divstyle.dollarFlex}>$ {dollar}</div>
      </div>
    </div>
  );
};

export default index;
