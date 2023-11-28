import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract, ContractCodeNotStoredError } from "web3";
import { PairContract } from "src/Interface/Token.interface";
import { getPoolVolumeFromEvent } from "../event/volume";
import { getPoolLiquidityFromEvent } from "../event/liquidity";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    pairAddress: string;
    userAddress: string;
    web3: Web3;
}

export const getEachPool =async ({pairContract, dataContract, pairAddress, userAddress, web3} : Params) => {
    const data = await (dataContract.methods.getEachPool as any)(pairAddress, userAddress).call();
    const volume = await getPoolVolumeFromEvent(pairContract, pairAddress);
    const liquidityData = await getPoolLiquidityFromEvent(pairContract, pairAddress);
    const pool = {
            pairAddress: data.pairAddress,
            token0Address: data.token0,
            token1Address: data.token1,
            token0Uri: data.token0Uri,
            token1Uri: data.token1Uri,
            token0Symbol: data.token0Symbol,
            token1Symbol: data.token1Symbol,
            pairTvl: Number(Number(web3.utils.fromWei(data.tvl, "ether")).toFixed(5)),
            pairVolume: Number(Number(web3.utils.fromWei(volume, "ether")).toFixed(5)),
            pairLiquidity: Number(Number(web3.utils.fromWei(liquidityData.liquidity, "ether")).toFixed(5)),
            pairBalance: Number(Number(web3.utils.fromWei(data.balance, "ether")).toFixed(5)),
            pairLiquidityArr: liquidityData.liquidityArr
        }
        
    return pool;
}