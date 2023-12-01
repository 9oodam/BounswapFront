export const getTokenPriceFromEvent = async (pairContract, tokenAddress) => {
    const fromBlock = 0; // 시작 블록
    const toBlock = 'latest'; // 최신 블록
    const data = await pairContract.getPastEvents("Mint", {
        fromBlock: fromBlock,
        toBlock: toBlock
    });

    let priceArr = [];
    for (let i = 1; i < data.length; i++) {
        if(tokenAddress = data[i].returnValues.token0) {
            const difference = data[i].returnValues.price0 - data[i-1].returnValues.price0;
            priceArr.push(difference);
        }else if(tokenAddress = data[i].returnValues.token1) {
            const difference = data[i].returnValues.price1 - data[i-1].returnValues.price1;
            priceArr.push(difference);
        }
      }

    return priceArr;
}