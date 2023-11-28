export const getPoolLiquidityFromEvent = async (pairContract, pairAddress) => {
    const fromBlock = 0; // 시작 블록
    const toBlock = 'latest'; // 최신 블록
    const data = await pairContract.getPastEvents("Mint", {
        fromBlock: fromBlock,
        toBlock: toBlock
    });

    let liquidity;
    let liquidityArr = [];
    for (let i = 0; i < data.length; i++) {
        if(data[i].returnValues.pairAddress == pairAddress) {
            console.log(data[i].returnValues.totalSupply)
            liquidityArr.push(data[i].returnValues.totalSupply)
        }
        liquidity = data[i].returnValues.totalSupply;
    }

    return {liquidity, liquidityArr};
}