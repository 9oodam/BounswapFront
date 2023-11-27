import Web3, { Contract } from "web3";

interface Params {
    pairContract: Contract<any>;
    userAddress: string;
    pairAddress: string;
    web3: Web3;
}

export const poolGetUserLiquidity = async ({ pairContract, userAddress, pairAddress, web3 }: Params) => {
    const data = await (pairContract.methods.poolGetUserLiquidity as any)(pairAddress).call({
        from : userAddress
    });
    const userLiquidity =
    {
        token0Liquidity: Number(web3.utils.fromWei(data[0], "ether")),
        token1Liquidity: Number(web3.utils.fromWei(data[1], "ether"))
    }
    console.log("userliquidity", userLiquidity);

    return userLiquidity;
}