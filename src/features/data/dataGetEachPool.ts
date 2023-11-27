import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { PairContract } from "src/Interface/Token.interface";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    pairAddress: string;
    userAddress: string;
    web3: Web3;
}

export const getEachPool =async ({pairContract, dataContract, pairAddress, userAddress, web3} : Params) => {
    const data = await (dataContract.methods.getEachPool as any)(pairAddress, userAddress).call();
    const pool = {
            pairAddress: data.pairAddress,
            token0Address: data.token0,
            token1Address: data.token1,
            token0Uri: data.token0Uri,
            token1Uri: data.token1Uri,
            token0Symbol: data.token0Symbol,
            token1Symbol: data.token1Symbol,
            pairTvl: Number(Number(web3.utils.fromWei(data.tvl, "ether")).toFixed(5)),
            pairVolume: 0,
            pairBalance: Number(Number(web3.utils.fromWei(data.balance, "ether")).toFixed(5)) 
        }

    return pool;
}