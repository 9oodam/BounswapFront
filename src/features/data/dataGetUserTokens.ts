import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenArray, TokenContract, TokenItem } from "src/Interface/Token.interface";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    queryClient: QueryClient;
    user: any;
    web3 : Web3;
}

export const getUserTokens = async ({pairContract, dataContract, queryClient, user, web3} : Params) => {
    const data = await (dataContract.methods.getUserTokens as any)(user.account).call();
    let tokens : TokenArray = [];
    const tokensObj : { [key : string] : TokenItem} = {};
    if(data) {
        data?.map((el : TokenContract, index : number) => {
            let uri;
            let balance;
    
            if (el.symbol != "GOV") {
                uri = el.uri;
            } else {
                uri = "images/BounsIo_LOGO.png";
            }
    
            if(el.symbol == "BNC") {
                balance = Number(Number(user.balance).toFixed(4));
            }else {
                balance = Number(Number(web3.utils.fromWei(el.balance, "ether")).toFixed(4));
            }
    
            let token : TokenItem = {
                tokenAddress: el.tokenAddress,
                tokenName: el.name, 
                tokenSymbol: el.symbol,
                tokenUri: uri,
                tokenTvl: Number(Number(web3.utils.fromWei(el.tvl, "ether")).toFixed(4)),
                tokenVolume: 0,
                tokenVolume7D: 0,
                tokenBalance: balance,
                tokenPriceArr: [0]
            }
            tokens.push(token);
            tokensObj[el.tokenAddress] = token;
        });
    }
    const userTokens = [...tokens];
    const gov = tokens[1];
    tokens.splice(1, 1);
    const swapTokens = tokens;
    queryClient.setQueryData(["userTokens"], userTokens);
    queryClient.setQueryData(["gov"], gov);
    queryClient.setQueryData(["swapTokens"], swapTokens);
    queryClient.setQueryData(["tokensObj"], tokensObj);
    return {userTokens : userTokens, gov : gov, swapTokens : swapTokens, tokensObj : tokensObj};
}