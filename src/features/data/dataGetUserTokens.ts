import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    dataContract: Contract<any>;
    queryClient: QueryClient;
    userAddress: string;
    web3 : Web3;
}

export const getUserTokens =async ({dataContract, queryClient, userAddress, web3} : Params) => {
    const data = await (dataContract.methods.getUserTokens as any)(userAddress).call();
    const userTokens = data?.map((el : TokenContract, index : number) => {
        return {
            tokenAddress: el.tokenAddress,
            tokenName: el.name,
            tokenSymbol: el.symbol,
            tokenUri: el.uri,
            tokenTvl: Number(web3.utils.fromWei(el.tvl, "ether")),
            tokenVolume: 0,
            tokenVolume7D: 0,
            tokenBalance: Number(web3.utils.fromWei(el.balance, "ether"))
        }
    });
    userTokens.splice(0,1);
    console.log("features getUserTokens,", userTokens);
    queryClient.setQueryData(["userTokens"], userTokens);
    return userTokens;
}