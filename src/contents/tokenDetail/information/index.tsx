import React, { useEffect, useRef, useState, useMemo } from "react";
import { Divstyle, Textstyle } from "./information.style";

const Information = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const tokenInfo = useRef<string>("");
  const textLimit = useRef<number>(400);

  const SetInfo = () => {
    tokenInfo.current =
      "Ethereum is a smart contract platform that enables developers to build tokens and decentralized applications (dapps). ETH is the native currency for the Ethereum platform and also works as the transaction fees to miners on the Ethereum network. Ethereum is the pioneer for blockchain based smart contracts. Smart contract is essentially a computer code that runs exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference. It can facilitate the exchange of money, content, property, shares, or anything of value. When running on the blockchain a smart contract becomes like a self-operating computer program that automatically executes when specific conditions are met. Ethereum allows programmers to run complete-turing smart contracts that is capable of any customizations. Rather than giving a set of limited operations, Ethereum allows developers to have complete control over customization of their smart contract, giving developers the power to build unique and innovative applications. Ethereum being the first blockchain based smart contract platform, they have gained much popularity, resulting in new competitors fighting for market share. The competitors includes: Ethereum Classic which is the oldchain of Ethereum, Qtum, EOS, Neo, Icon, Tron and Cardano. Ethereum wallets are fairly simple to set up with multiple popular choices such as myetherwallet, metamask, and Trezor. Read here for more guide on using ethereum wallet: How to Use an Ethereum Wallet";
  };

  const commenter = useMemo(() => {
    SetInfo();
    const shortInfo = tokenInfo.current.slice(0, textLimit.current);
    if (tokenInfo.current.length > textLimit.current) {
      if (showMore) {
        return tokenInfo.current;
      }
      return shortInfo;
    }
    return shortInfo;
  }, [showMore]);

  return (
    <div className={Divstyle.flex}>
      <div className={Textstyle.title}>Information</div>
      <div className={Textstyle.mainText}>{`${commenter}${
        showMore ? "" : "..."
      }`}</div>
      <div
        onClick={() => {
          setShowMore(!showMore);
        }}
        className={Textstyle.show}
      >
        {tokenInfo.current.length > textLimit.current &&
          (showMore ? "hide" : "show more")}
      </div>
    </div>
  );
};

export default Information;
