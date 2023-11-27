// import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    tokenAddress: string;
    web3: Web3;
}

export const getEachToken = async ({ pairContract, dataContract, tokenAddress, web3 }: Params) => {
    const data = await (dataContract.methods.getEachToken as any)(tokenAddress, 0).call();
    let uri;
    if (data.symbol != "GOV") {
        uri = data.uri;
    } else {
        uri = "images/BounsIo_LOGO.png";
    }
    const token = {
        tokenAddress: data.tokenAddress,
        tokenName: data.name,
        tokenSymbol: data.symbol,
        tokenUri: uri,
        tokenTvl: Number(Number(web3.utils.fromWei(data.tvl, "ether")).toFixed(5)),
        tokenVolume: 0,
        tokenVolume7D: 0,
        tokenBalance: Number(Number(web3.utils.fromWei(data.balance, "ether")).toFixed(5))
    }

    return token;
}