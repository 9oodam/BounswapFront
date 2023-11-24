import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    dataContract: Contract<any>;
    queryClient: QueryClient;
    web3 : Web3;
}

export const getAllTokens =async ({dataContract, queryClient, web3} : Params) => {
    const data = await dataContract.methods.getAllTokens().call();
    const tokens = data?.map((el : TokenContract) => {
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
    console.log("features getAlltokens");
    queryClient.setQueryData(["allTokens"], tokens);
    return tokens;
}