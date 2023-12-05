import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TokenItem } from "src/Interface/Token.interface";
import { getEachToken } from "src/features/data/dataGetEachToken";
import { Divstyles } from "./tokenDetail.style";
import Container from "src/components/container";
import DivCard from "../../components/Card";
import CardTitle from "../../components/Card/CardTitle";
import AreaChart from "src/components/AreaChart";
import Information from "../../contents/tokenDetail/information";
import TokenName from "src/components/TokenName";
import useWeb3 from "src/hooks/web3.hook";
import TokenVolume from "src/contents/tokenDetail/TokenDetail";
import LoadingIndicator from "src/components/LoadingIndicator";

const TokenDetail: React.FC = () => {
  const { web3, dataContract, pairContract } = useWeb3(null);
  const { id } = useParams();
  const [token, setToken] = useState<TokenItem | null>(null);
  const [priceArr, setPriceArr] = useState<number[]>([]);
  const [indexArr, setIndexArr] = useState<number[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!pairContract || !dataContract || !id || !web3) return;
    const getData = async () => {
      // * 토큰 price 값 배열로 반환받음
      const data = await getEachToken({
        pairContract,
        dataContract,
        tokenAddress: id,
        web3,
      });
      setToken(data);
    };
    getData();
  }, [dataContract]);

  useEffect(() => {
    if (token) {
      let indexs: number[] = [];
      const Arr = token.tokenPriceArr.map((el, index) => {
        indexs.push(index + 1);
        return Number(el) / 10 ** 18;
      });
      setPriceArr(Arr);
      setIndexArr(indexs);
    }
  }, [token]);

  if (!token) {
    return <LoadingIndicator />;
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
              <CardTitle>Price</CardTitle>
              <AreaChart
                data={priceArr}
                index={indexArr}
                name={`${token.tokenSymbol} price`}
              />
            </DivCard>
            <DivCard>
              <CardTitle>Token Details</CardTitle>
              <TokenVolume data={token} />
            </DivCard>
          </div>
          <Information />
        </div>
      </Container>
    </>
  );
};

export default TokenDetail;
