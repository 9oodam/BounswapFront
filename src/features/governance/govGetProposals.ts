import { QueryClient } from "@tanstack/react-query";
import Web3, { Contract } from "web3";
import { ProposalContract } from "src/Interface/governance.interface";

interface Params {
    governanceContract: Contract<any>;
    queryClient: QueryClient;
    web3 : Web3;
}

const getState = (state : number, endTime : number) => {
// const getState = (state : bigint, endTime : bigint) => {
    const currentTime = new Date().getTime() / 1000;
    if (state != 0) return state;
    if (currentTime <= endTime) return 0;
    return 1;
}

const getPercent = (votes : number, forVotes : number, againstVotes : number) => {
    if (forVotes + againstVotes == 0) return 0;
    return (votes / (forVotes + againstVotes) * 100).toString().split(".")[0];
}

export const getProposals =async ({governanceContract, queryClient, web3} : Params) => {
    const data = await governanceContract.methods.getProposals().call();
    const proposals = data?.map((el : ProposalContract) => {
        return {
            id: Number(el.id),
            proposer: el.proposer,
            title: web3.utils.hexToUtf8(String(el.title)),
            description: web3.utils.hexToUtf8(String(el.description)),
            quorumVotes: Number(Number(web3.utils.fromWei(el.quorumVotes, "ether")).toFixed(5)), // 소수점 5자리 number
            forVotes: Number(Number(web3.utils.fromWei(el.forVotes, "ether")).toFixed(5)), // 소수점 5자리 number
            againstVotes: Number(Number(web3.utils.fromWei(el.againstVotes, "ether")).toFixed(5)), // 소수점 5자리 number
            startTime: Number(el.startTime),
            endTime: Number(el.endTime),
            state: getState(Number(el.state), Number(el.endTime)),
            forPercent : getPercent(Number(web3.utils.fromWei(el.forVotes, "ether")), Number(web3.utils.fromWei(el.forVotes, "ether")), Number(web3.utils.fromWei(el.againstVotes, "ether"))),
            againstPercent : getPercent(Number(web3.utils.fromWei(el.againstVotes, "ether")), Number(web3.utils.fromWei(el.forVotes, "ether")), Number(web3.utils.fromWei(el.againstVotes, "ether")))
        }
    });
    queryClient.setQueryData(["proposals"], proposals);
    return proposals;
}