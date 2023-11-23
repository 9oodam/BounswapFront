import React, { useEffect, useState } from "react";
import Container from "src/components/container";
import { Divstyles } from "./tokenDetail.style";
import DivCard from "../../components/Card";
import CardTitle from "../../components/Card/CardTitle";
import ChartDiv from "../../components/Card/Chart";
import Information from "../../contents/tokenDetail/information";
import TokenName from "src/components/TokenName";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { TokenArray, TokenItem } from "src/Interface/Token.interface";
import { getEachToken } from "src/features/data/dataGetEachToken";
import useWeb3 from "src/hooks/web3.hook";

const TokenDetail: React.FC = () => {
  const { dataContract } = useWeb3(null);
  // const [tokens, setTokens] = useState<TokenArray | null>(null);
  const [tokens, setTokens] = useState<TokenItem | null>(null);
  const nav = useNavigate();

  const queryClient = useQueryClient();
  const { id } = useParams();


  // 컨트랙트 호출 테스트
  useEffect(()=>{
    if (!dataContract || !id) return;
    const test =async () => {
      const data = await getEachToken({dataContract, tokenAddress : id});
      setTokens(data);
    }
    test();
  },[tokens, dataContract])

  

  return (
    <>
      <TokenName
        tokenImg="https://i.pinimg.com/564x/76/ca/1a/76ca1a94e6866f3b1156218c6723ce3a.jpg"
        tokenName="Ether"
        tokenSymbol="ETH"
        // tokenName="Ether"
        // tokenSymbol="ETH"
        onClick={() => nav(-1)}
      />
      <Container>
        <div className={Divstyles.flexRow}>
          <div className={Divstyles.flexCol}>
            <DivCard>
              <CardTitle>Volume</CardTitle>
              <ChartDiv />
            </DivCard>
            <Information />
          </div>
          <DivCard>
            <CardTitle>Swap</CardTitle>
          </DivCard>
        </div>
      </Container>
    </>
  );
};

export default TokenDetail;
