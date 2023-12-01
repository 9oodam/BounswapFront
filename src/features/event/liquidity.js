export const getPoolLiquidityFromEvent = async (pairContract, web3, pairAddress) => {
    const fromBlock = 0; // 시작 블록
    const toBlock = 'latest'; // 최신 블록
    const data = await pairContract.getPastEvents("Mint", {
        fromBlock: fromBlock,
        toBlock: toBlock
    });

    let liquidity = 0;
    let liquidityArr = [0];
    if(data) {
        for (let i = 0; i < data.length; i++) {
            if(data[i].returnValues.pairAddress == pairAddress) {
                console.log(data[i].returnValues.totalSupply)
                liquidityArr.push(Number(Number(web3.utils.fromWei(data[i].returnValues.totalSupply, "ether")).toFixed(5)))
            }
            liquidity = Number(Number(web3.utils.fromWei(data[i].returnValues.totalSupply, "ether")).toFixed(5))
        }
    }

    return {liquidity, liquidityArr};
}