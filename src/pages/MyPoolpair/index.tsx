import { Divstyle } from "./poolpair.styled";
import { useParams } from "react-router-dom";
import { getEachPool } from "src/features/data/dataGetEachPool";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getUnclaimedFee } from "src/features/data/dataGetUnclaimedFee";
import { poolGetUserLiquidity } from "src/features/pair/pairpoolGetUserLiquidity";
import { getUserTokens } from "src/features/data/dataGetUserTokens";
import { getUserPools } from "src/features/data/dataGetUserPools";
import Container from "src/components/container";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
import Pairname from "../../components/Pairname";
import DepositeCard from "src/contents/poolpair/DepositeCard";
import useWeb3 from "src/hooks/web3.hook";
import UnclaimedFeesCard from "src/contents/poolpair/UnclaimedFeesCard";
import LoadingIndicator from "src/components/LoadingIndicator";

const MyPoolpair: React.FC = () => {
  const { web3, user, dataContract, pairContract } = useWeb3(null);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const getData = async () => {
    if (!pairContract || !dataContract || !id || user.account == "" || !web3) return null;
    const pool = await getEachPool({ pairContract, dataContract, queryClient, pairAddress: id, userAddress: user.account, web3 });
    const fee = await getUnclaimedFee({ dataContract, userAddress: user.account, pairAddress: id, web3 });
    const userLiquidity = await poolGetUserLiquidity({ pairContract, userAddress: user.account, pairAddress: id, web3 });
    const mypool = { pool, fee, userLiquidity };
    queryClient.setQueryData([`mypool_${id}`], mypool);
    return mypool;
  };

  const { data, refetch } = useQuery({
    queryKey: [`mypool_${id}`],
    queryFn: getData,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!pairContract || !dataContract || !web3 || !user)
  });

  const getTokens = async () => {
    console.log("gettokens1");
    if (!pairContract || !dataContract || !web3 || user.account == "") return null;
    console.log("gettoekns2");
    const data = await getUserTokens({
      pairContract,
      dataContract,
      queryClient,
      user: user,
      web3,
    });
    return data.userTokens;
  };

  const getPools = async () => {
    if (!pairContract || !dataContract || !web3 || user.account == "")
      return null;
    const data = await getUserPools({
      pairContract,
      dataContract,
      queryClient,
      userAddress: user.account,
      web3,
    });
    return data;
  };

  const { data: tokens, refetch: tokenRefetch } = useQuery({
    queryKey: ["userTokens"],
    queryFn: getTokens,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!dataContract || !web3 || !user),
  });

  const { data: pools, refetch: poolRefetch } = useQuery({
    queryKey: ["userPairs"],
    queryFn: getPools,
    gcTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: "always",
    enabled: !(!dataContract || !web3 || !user),
  });

  if (!data || !pairContract || !user) {
    refetch();
    return <LoadingIndicator />;
  }

  return (
    <>
      <Pairname data={data.pool} />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DepositeCard pool={data.pool} userLiquidity={data.userLiquidity} />
            <UnclaimedFeesCard pairCon={pairContract} user={user.account} pool={data.pool} fee={data.fee} refetch={refetch} tokenRefetch={tokenRefetch} poolRefetch={poolRefetch} />
          </div>
          <AddRemoveLiquidity data={data.pool} refetch={refetch} />
        </div>
      </Container>
    </>
  );
};

export default MyPoolpair;