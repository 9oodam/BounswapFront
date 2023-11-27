import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { PairArray, PairContract } from "src/Interface/Token.interface";
import { getPoolVolumeFromEvent } from "../event/volume";
import { getPoolLiquidityFromEvent } from "../event/liquidity";

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
        pairTvl: Number(web3.utils.fromWei(el.tvl, "ether")),
        pairVolume: Number(web3.utils.fromWei(volume, "ether")),
        pairLiquidity: Number(web3.utils.fromWei(liquidityData.liquidity, "ether")),
        pairBalance: Number(web3.utils.fromWei(el.balance, "ether")),
        pairLiquidityArr: [0]
    }
}

export const getAllPools =async ({pairContract, dataContract, queryClient, web3} : Params) => {
    const data: PairContract[] = await dataContract.methods.getAllPools().call();
    const pools: PairArray = [];

    if(data) {
        for (let i = 0; i < data.length; i++) {
            let volume = await getPoolVolumeFromEvent(pairContract, data[i].pairAddress);
            let liquidityData = await getPoolLiquidityFromEvent(pairContract, data[i].pairAddress);
            let pool = await poolData(web3, data[i], volume, liquidityData);        
            pools.push(pool);
        }
    }
    // const pools = data?.map(async (el : PairContract) => {
    //     let volume = await getPoolVolumeFromEvent(pairContract, el.pairAddress);
    //     let liquidityData = await getPoolLiquidityFromEvent(pairContract, el.pairAddress);

    // });
    console.log(pools)

    queryClient.setQueryData(["pairs"], pools);
    return pools;
}