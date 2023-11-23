// import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    dataContract: Contract<any>;
    tokenAddress: string;
}

export const getEachToken =async ({dataContract, tokenAddress} : Params) => {
    const data = await (dataContract.methods.getEachToken as any)(tokenAddress, 0).call();
    const token = {
            tokenAddress: data.tokenAddress,
            tokenName: data.name,
            tokenSymbol: data.symbol,
            tokenUri: data.uri,
            tokenTvl: data.tvl,
            tokenVolume: 0,
            tokenVolume7D: 0,
            tokenBalance: data.balance
        }

    return token;
}