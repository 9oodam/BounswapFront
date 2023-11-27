export const getTokenPriceFromEvent = async (pairContract, tokenAddress) => {
    const fromBlock = 0; // 시작 블록
    const toBlock = 'latest'; // 최신 블록
    const data = await pairContract.getPastEvents("Mint", {
        fromBlock: fromBlock,
        toBlock: toBlock
    });

    let priceArr = [];
    for (let i = 0; i < data.length-1; i++) {
        if(data[i].returnValues.token0 == tokenAddress) {
            priceArr.push(data[i+1].returnValues.price0 - data[i].returnValues.price0)
        }else if(data[i].returnValues.token1 == tokenAddress) {
            priceArr.push(data[i+1].returnValues.price1 - data[i].returnValues.price1)
        }
    }
    return priceArr;
}