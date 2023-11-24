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
  const { web3, dataContract } = useWeb3(null);
  const [token, setToken] = useState<TokenItem | null>(null);
  const nav = useNavigate();

  const queryClient = useQueryClient();
  const { id } = useParams();

  // 컨트랙트 호출 테스트
  useEffect(()=>{
    if (!dataContract || !id || !web3) return;
    const getData =async () => {
      const data = await getEachToken({dataContract, tokenAddress : id, web3});
      setToken(data);
      console.log("getData, getEachToken", data);
    }
    getData();
  },[dataContract])

  if (!token) {
      return <>loading</>;
  }


  return (
    <>
      <TokenName
        tokenImg={token.tokenUri}
        tokenName={token.tokenName}
        tokenSymbol={token.tokenSymbol}
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
            {/* <Swap/> */}
          </DivCard>
        </div>
      </Container>
    </>
  );
};

export default TokenDetail;
