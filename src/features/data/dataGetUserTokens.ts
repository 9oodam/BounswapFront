import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    queryClient: QueryClient;
    userAddress: string;
    web3 : Web3;
}

export const getUserTokens =async ({pairContract, dataContract, queryClient, userAddress, web3} : Params) => {
    const data = await (dataContract.methods.getUserTokens as any)(userAddress).call();
    const userTokens = data?.map((el : TokenContract, index : number) => {
        let uri;
        if (el.symbol != "GOV") {
            uri = el.uri;
        } else {
            uri = "images/BounsIo_LOGO.png";
        }

        return {
            tokenAddress: el.tokenAddress,
            tokenName: el.name,
            tokenSymbol: el.symbol,
            tokenUri: uri,
            tokenTvl: Number(Number(web3.utils.fromWei(el.tvl, "ether")).toFixed(5)),
            tokenVolume: 0,
            tokenVolume7D: 0,
            tokenBalance: Number(Number(web3.utils.fromWei(el.balance, "ether")).toFixed(5))
        }
    });
    userTokens.splice(0,1);
    queryClient.setQueryData(["userTokens"], userTokens);
    return userTokens;
}