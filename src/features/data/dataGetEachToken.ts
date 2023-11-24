// import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    dataContract: Contract<any>;
    tokenAddress: string;
    web3: Web3;
}

export const getEachToken =async ({dataContract, tokenAddress, web3} : Params) => {
    const data = await (dataContract.methods.getEachToken as any)(tokenAddress, 0).call();
    const token = {
            tokenAddress: data.tokenAddress,
            tokenName: data.name,
            tokenSymbol: data.symbol,
            tokenUri: data.uri,
            tokenTvl: Number(web3.utils.fromWei(data.tvl, "ether")),
            tokenVolume: 0,
            tokenVolume7D: 0,
            tokenBalance: Number(web3.utils.fromWei(data.balance, "ether"))
        }

    return token;
}