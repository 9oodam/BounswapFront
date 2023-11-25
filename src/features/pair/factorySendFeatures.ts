import { Contract } from "web3";

export const getPairAddress = async (pairContract: Contract<any>, tokenA: string, tokenB: string) => {
    const data = await (pairContract?.methods.factoryGetPairAddress as any)(tokenA, tokenB).call();
    console.log('pairAddress : ', data)
    return data;
}