import Container from "src/components/container";
import { Divstyle } from "./poolpair.styled";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import Card from "../../components/Card";
import CircleChart from "../../components/Card/CircleChart";
import Pairname from "../../components/Pairname";
import DepositeCard from "src/contents/poolpair/DepositeCard";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DataArray } from "src/Interface/Token.interface";
import useWeb3 from "src/hooks/web3.hook";
import { useParams } from "react-router-dom";
import { PairItem } from "src/Interface/Token.interface";
import { getEachPool } from "src/features/data/dataGetEachPool";
import UnclaimedFeesCard from "src/contents/poolpair/UnclaimedFeesCard";

const MyPoolpair: React.FC = () => {
  const { web3, user, dataContract } = useWeb3(null);
  const { id } = useParams();
  const [pool, setPool] = useState<PairItem>();

  const [pairs, setPairs] = useState<DataArray | null>(null);
  const queryClient = useQueryClient();
  // const pairs = queryClient.getQueryData("tokens");
  // const { data: pairs } = useQuery('tokens', () => {}, { enabled: false });

  // useEffect(() => {
  //   setPairs(queryClient.getQueryData("lpTokens"));
  //   console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", pairs);
  // }, [queryClient]);

  useEffect(() => {
    const getLptokens = async () => {
      const data = await queryClient.getQueryData<DataArray>(["lpTokens"]);
      console.log("❗️data", data);
      setPairs(data ? data : null);
      // console.log("@@lptokens", lptokens);
      console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️", pairs);
    };
    getLptokens();
  }, [queryClient]);

  useEffect(() => {
    console.log("진짜 제발료", pairs);
  }, [pairs]);

  // if (!pairs) {
  //   return <div>fheldwnd</div>;
  // }

  useEffect(() => {
    if (!dataContract || !id || user.account == "" || !web3) return;
    const getData = async () => {
      const pool = await getEachPool({
        dataContract,
        pairAddress: id,
        userAddress: user.account,
        web3,
      });
      console.log("pool 테스트", pool);
      setPool(pool);
    };
    getData();
  }, [dataContract, user]);

  if (!pool) {
    return <>loading</>;
  }

  return (
    // <div className={Divstyle.w_90}>
    <>
      <Pairname data={pool} />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DepositeCard />
            <UnclaimedFeesCard />
          </div>
          <AddRemoveLiquidity data={pool} />
        </div>
      </Container>
    </>
  );
};

export default MyPoolpair;
