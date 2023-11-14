import React from "react";
import Container from "src/components/container";
import { Divstyles } from "./tokenDetail.style";
import DivCard from "../../components/Card";
import CardTitle from "../../components/Card/CardTitle";
import ChartDiv from "../../components/Card/Chart";
import Information from "../../contents/tokenDetail/information";
import TokenName from "src/components/TokenName";
import { useNavigate } from "react-router-dom";

const TokenDetail: React.FC = () => {
  const nav = useNavigate();
  return (
    <>
      <TokenName
        tokenImg="https://i.pinimg.com/564x/76/ca/1a/76ca1a94e6866f3b1156218c6723ce3a.jpg"
        tokenName="Ether"
        tokenSymbol="ETH"
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
