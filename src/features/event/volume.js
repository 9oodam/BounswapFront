export const getTokenVolumeFromEvent = async (pairContract, tokenAddress) => {
    const fromBlock = 0; // 시작 블록
    const toBlock = 'latest'; // 최신 블록
    const data = await pairContract.getPastEvents("SwapAmount", {
        fromBlock: fromBlock,
        toBlock: toBlock
    });

    let volume = 0n;
    data?.map((value) => {
        const values = value.returnValues;
        if(tokenAddress == values.token0) {
            let InOut = values.amount0In + values.amount0Out;
            volume += InOut;
        }else if(tokenAddress == values.token1) {
            let InOut = values.amount1In + values.amount1Out;
            volume += InOut;
        }
    })
    return volume;
}

export const getPoolVolumeFromEvent = async (pairContract, pairAddress) => {
    const fromBlock = 0; // 시작 블록
    const toBlock = 'latest'; // 최신 블록
    const data = await pairContract.getPastEvents("SwapAmount", {
        fromBlock: fromBlock,
        toBlock: toBlock
    });

    let volume = 0n;
    data?.map((value) => {
        const values = value.returnValues;
        if(values.pairAddress == pairAddress) {
            let InOut = values.amount0In + values.amount0Out + values.amount1In + values.amount1Out;
            volume += InOut;
        }
    })
    return volume;
}