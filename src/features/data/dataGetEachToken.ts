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

export const getEachToken = async ({ pairContract, dataContract, tokenAddress, web3 }: Params) => {
    const data: TokenContract = await (dataContract.methods.getEachToken as any)(tokenAddress, 0).call();
    const volume = await getTokenVolumeFromEvent(pairContract, tokenAddress);
    const priceArr = await getTokenPriceFromEvent(pairContract, tokenAddress)
    console.log(volume, priceArr)
    const token = {
        tokenAddress: data.tokenAddress,
        tokenName: data.name,
        tokenSymbol: data.symbol,
        tokenUri: data.uri,
        tokenTvl: Number(Number(web3.utils.fromWei(data.tvl, "ether")).toFixed(5)),
        tokenVolume: Number(Number(web3.utils.fromWei(volume, "ether")).toFixed(5)),
        tokenVolume7D: Number(Number(web3.utils.fromWei(volume, "ether")).toFixed(5)),
        tokenBalance: Number(Number(web3.utils.fromWei(data.balance, "ether")).toFixed(5)),
        tokenPriceArr: priceArr
    }
    console.log(token);

    return token;
}