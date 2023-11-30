import Web3, { Contract } from "web3";

interface Params {
    dataContract: Contract<any>;
    userAddress: string;
    pairAddress: string;
    web3: Web3;
}

export const getUnclaimedFee = async ({ dataContract, userAddress, pairAddress, web3 }: Params) => {
    const data = await (dataContract.methods.getUnclaimedFee as any)(userAddress, pairAddress).call();
    const unclaimedFeeData =
    {
        token0FeeAmount: Number(Number(web3.utils.fromWei(data[0], "ether")).toFixed(5)),
        token1FeeAmount: Number(Number(web3.utils.fromWei(data[1], "ether")).toFixed(5))
    }

    return unclaimedFeeData;
}