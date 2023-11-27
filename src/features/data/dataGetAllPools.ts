import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { PairContract } from "src/Interface/Token.interface";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    queryClient: QueryClient;
    web3: Web3
}

export const getAllPools =async ({pairContract, dataContract, queryClient, web3} : Params) => {
    const data = await dataContract.methods.getAllPools().call();
    const pools = data?.map((el : PairContract) => {
        return {
            pairAddress: el.pairAddress,
            token0Address: el.token0,
            token1Address: el.token1,
            token0Uri: el.token0Uri,
            token1Uri: el.token1Uri,
            token0Symbol: el.token0Symbol,
            token1Symbol: el.token1Symbol,
            pairTvl: Number(Number(web3.utils.fromWei(el.tvl, "ether")).toFixed(5)),
            pairVolume: 0,
            pairBalance: Number(Number(web3.utils.fromWei(el.balance, "ether")).toFixed(5))
        }
    });

    queryClient.setQueryData(["pairs"], pools);
    return pools;
}