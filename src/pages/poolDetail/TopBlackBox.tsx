import React from "react";
import BodyBackground from "../../components/DivBox/BodyBackground";
import DivCard from "../../components/DivBox/DivCard";
import CardTitle from "../../components/Titles/CardTitle";
import ChartDiv from "../../components/DivBox/ChartDiv";
import PairCoinsBox from "../../components/DivBox/PairCoinsBox";
import AddRemoveLiquidity from "../../contents/AddRemoveLiquidity/AddRemoveLiquidity";

const TopBlackBox = () => {
  return (
    <BodyBackground>
      <div className="flex items-start flex-row">
        <div>
          <DivCard>
            <CardTitle>Liquidity</CardTitle>
            <ChartDiv></ChartDiv>
          </DivCard>
          <DivCard>
            <CardTitle>Deposit Balance</CardTitle>
            <PairCoinsBox></PairCoinsBox>
          </DivCard>
        </div>
        <AddRemoveLiquidity />
      </div>
    </BodyBackground>
  );
};

export default TopBlackBox;
