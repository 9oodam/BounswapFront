// import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { TokenContract } from "src/Interface/Token.interface";
import { getTokenVolumeFromEvent } from "../event/volume";
import { getTokenPriceFromEvent } from "../event/price";

interface Params {
    pairContract: Contract<any>;
    dataContract: Contract<any>;
    tokenAddress: string;
    web3: Web3;
}

export const getEachToken =async ({pairContract, dataContract, tokenAddress, web3} : Params) => {
    const data: TokenContract = await (dataContract.methods.getEachToken as any)(tokenAddress, 0).call();
    const volume = await getTokenVolumeFromEvent(pairContract, tokenAddress);
    const priceArr = await getTokenPriceFromEvent(pairContract, tokenAddress)
    console.log(volume, priceArr)
    const token = {
            tokenAddress: data.tokenAddress,
            tokenName: data.name,
            tokenSymbol: data.symbol,
            tokenUri: data.uri,
            tokenTvl: Number(web3.utils.fromWei(data.tvl, "ether")),
            tokenVolume: Number(web3.utils.fromWei(volume, "ether")),
            tokenVolume7D: Number(web3.utils.fromWei(volume, "ether")),
            tokenBalance: Number(web3.utils.fromWei(data.balance, "ether")),
            tokenPriceArr: priceArr
    }
    console.log(token);

    return token;
}