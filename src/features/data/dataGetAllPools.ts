import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { PairArray, PairContract, PairItem } from "src/Interface/Token.interface";
import { getPoolVolumeFromEvent } from "../event/volume";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    queryClient: QueryClient;
    web3: Web3
}

interface liquidityData {
    liquidity: bigint;
    liquidityArr: bigint[];
}

const poolData = async (web3: Web3, el: PairContract, volume: bigint, liquidityData: liquidityData) => {
    return {
        pairAddress: el.pairAddress,
        token0Address: el.token0,
        token1Address: el.token1,
        token0Uri: el.token0Uri,
        token1Uri: el.token1Uri,
        token0Symbol: el.token0Symbol,
        token1Symbol: el.token1Symbol,
        pairTvl: Number(Number(web3.utils.fromWei(el.tvl, "ether")).toFixed(5)),
        pairVolume: Number(Number(web3.utils.fromWei(volume, "ether")).toFixed(5)),
        pairLiquidity: Number(Number(web3.utils.fromWei(liquidityData.liquidity, "ether")).toFixed(5)),
        pairBalance: Number(Number(web3.utils.fromWei(el.balance, "ether")).toFixed(5)),
        pairLiquidityArr: [0]
    }
}

export const getAllPools = async ({ pairContract, dataContract, queryClient, web3 }: Params) => {
    const data: PairContract[] = await dataContract.methods.getAllPools().call();
    let pools: PairArray = [];

    if (data) {
        for (let i = 0; i < data.length; i++) {
            let volume: bigint = await getPoolVolumeFromEvent(pairContract, data[i].pairAddress);
            let liquidityData = {
                liquidity: 0n,
                liquidityArr: [0n]
            }
            let pool = await poolData(web3, data[i], volume, liquidityData);
            pools.push(pool);
        }
    }

    queryClient.setQueryData(["allPools"], pools);
    return pools;
}