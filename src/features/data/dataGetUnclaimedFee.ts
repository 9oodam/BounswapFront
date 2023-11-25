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
        token0FeeAmount: Number(web3.utils.fromWei(data[0], "ether")),
        token1FeeAmount: Number(web3.utils.fromWei(data[1], "ether"))
    }
    console.log("data", data);

    return unclaimedFeeData;
}