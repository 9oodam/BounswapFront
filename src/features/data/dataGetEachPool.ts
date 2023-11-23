import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";
import { PairContract } from "src/Interface/Token.interface";

interface Params {
    dataContract: Contract<any>;
    pairAddress: string;
    userAddress: string;
}

export const getEachPool =async ({dataContract, pairAddress, userAddress} : Params) => {
    const data = await (dataContract.methods.getEachPool as any)(pairAddress, userAddress).call();
    const pool = data?.map((el : PairContract) => {
        return {
            pairAddress: el.pairAddress,
            token0Uri: el.token0Uri,
            token1Uri: el.token1Uri,
            token0Symbol: el.token0Symbol,
            token1Symbol: el.token1Symbol,
            pairTvl: el.tvl,
            pairVolume: 0,
            pairBalance: el.balance
        }
    });

    return pool;
}