import React from "react";
import Container from "src/components/container";
import { Divstyles } from "./tokenDetail.style";
import DivCard from "../../components/Card";
import CardTitle from "../../components/Card/CardTitle";
import ChartDiv from "../../components/Card/Chart";
import Information from "../../contents/tokenDetail/information";
import TokenName from "src/components/TokenName";

const TokenDetail: React.FC = () => {
  return (
    <>
      <TokenName />
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
