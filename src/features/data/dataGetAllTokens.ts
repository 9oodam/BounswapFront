import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenArray, TokenContract, TokenItem } from "src/Interface/Token.interface";
import { getTokenVolumeFromEvent } from "../event/volume";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    queryClient: QueryClient;
    web3 : Web3;
}

const tokenData = async (web3: Web3, el: TokenContract, volume: bigint) => {
    return {
        tokenAddress: el.tokenAddress,
        tokenName: el.name,
        tokenSymbol: el.symbol,
        tokenUri: el.uri,
        tokenTvl: Number(Number(web3.utils.fromWei(el.tvl, "ether")).toFixed(5)),
        tokenVolume: Number(Number(web3.utils.fromWei(volume, "ether")).toFixed(5)),
        tokenVolume7D: Number(Number(web3.utils.fromWei(volume, "ether")).toFixed(5)),
        tokenBalance: Number(Number(web3.utils.fromWei(el.balance, "ether")).toFixed(5)),
        tokenPriceArr: [0]
    }
}

export const getAllTokens = async ({pairContract, dataContract, queryClient, web3} : Params) => {
    const data: TokenContract[] = await dataContract.methods.getAllTokens().call();
    let tokens: TokenArray = [];

    if(data) {
        for (let i = 0; i < data.length; i++) {
            let volume = await getTokenVolumeFromEvent(pairContract, data[i].tokenAddress);
            let token = await tokenData(web3, data[i], volume);        
            tokens.push(token);
        }
    }

    console.log("features getAlltokens");
    queryClient.setQueryData(["allTokens"], tokens);
    return tokens;
}