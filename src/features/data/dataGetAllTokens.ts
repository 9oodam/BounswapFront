import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    dataContract: Contract<any>;
    queryClient: QueryClient;
}

export const getAllTokens =async ({dataContract, queryClient} : Params) => {
    const data = await dataContract.methods.getAllTokens().call();
    const tokens = data?.map((el : TokenContract) => {
        return {
            tokenAddress: el.tokenAddress,
            tokenName: el.name,
            tokenSymbol: el.symbol,
            tokenUri: el.uri,
            token1Symbol: el.tvl,
            tokenTvl: el.tvl,
            tokenVolume: 0,
            tokenVolume7D: 0,
            tokenBalance: el.balance
        }
    });

    queryClient.setQueryData(["tokens"], tokens);
    return tokens;
}