import Web3, { Contract } from "web3";

export const propose = async (governanceContract : Contract<any>, web3 : Web3, userAddress : string, title : string, description : string) => {
    await (governanceContract.methods.propose as any)(userAddress, [web3.utils.utf8ToHex(title), web3.utils.utf8ToHex(description)]).send({
        from : userAddress
    });
    return "proposal created";
}

export const vote = async (governanceContract : Contract<any>, id : number, userAddress : string, support : boolean) => {
    await (governanceContract.methods.vote as any)(id, userAddress, support).send({
        from : userAddress
    });

    const receipt = await (governanceContract.methods.getReceipt as any)(id, userAddress).call();
    return receipt.hasVoted;
}