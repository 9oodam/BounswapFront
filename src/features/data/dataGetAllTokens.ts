import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    queryClient: QueryClient;
    web3 : Web3;
}

export const getAllTokens =async ({pairContract, dataContract, queryClient, web3} : Params) => {
    const data = await dataContract.methods.getAllTokens().call();
    const tokens = data?.map((el : TokenContract) => {
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