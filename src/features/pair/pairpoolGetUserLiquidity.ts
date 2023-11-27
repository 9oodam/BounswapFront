import Web3, { Contract } from "web3";

interface Params {
    pairContract: Contract<any>;
    userAddress: string;
    pairAddress: string;
    web3: Web3;
}

const getPercent = (lp : number, token0Liquidity : number, token1Liquidity : number) => {
    if (token0Liquidity + token1Liquidity == 0) return 0;
    return (lp / (token0Liquidity + token1Liquidity) * 100).toString().split(".")[0];
}

export const poolGetUserLiquidity = async ({ pairContract, userAddress, pairAddress, web3 }: Params) => {
    const data = await (pairContract.methods.poolGetUserLiquidity as any)(pairAddress).call({
        from : userAddress
    });
    const userLiquidity =
    {
        token0Liquidity: web3.utils.fromWei(data[0], "ether"),
        token1Liquidity: web3.utils.fromWei(data[1], "ether"),
        token0Percent: getPercent(Number(web3.utils.fromWei(data[0], "ether")), Number(web3.utils.fromWei(data[0], "ether")), Number(web3.utils.fromWei(data[1], "ether")) ),
        token1Percent: getPercent(Number(web3.utils.fromWei(data[1], "ether")), Number(web3.utils.fromWei(data[0], "ether")), Number(web3.utils.fromWei(data[1], "ether")) ),
    }
    console.log("userliquidity", typeof(userLiquidity.token0Percent));

    return userLiquidity;
}