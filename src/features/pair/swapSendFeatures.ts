import { Contract } from "web3";

export const getAmountOut = async (pairContract: Contract<any>, pairAddress: string, inputAmount: BigInt, inputToken: string, outputToken: string) => {
    const amountOut = await (pairContract?.methods.swapGetAmountOut as any)(pairAddress, inputAmount, inputToken, outputToken).call();
    console.log('amountOut : ', amountOut);
    const minToken = await amountOut * 995 / 1000;
    console.log('minToken : ', minToken)
    return {amountOut, minToken};
}
export const getAmountIn = async (pairContract: Contract<any>, pairAddress: string, outputAmount: BigInt, inputToken: string, outputToken: string) => {
    const amountIn = await (pairContract?.methods.swapGetAmountIn as any)(pairAddress, outputAmount, inputToken, outputToken).call();
    console.log('amountIn : ', amountIn);
    const maxToken = amountIn / 995 * 1000;
    console.log('maxToken : ', maxToken)
    return {amountIn, maxToken};
}
export const getOutputReserve = async (pairContract: Contract<any>, pairAddress: string, outputToken: string) => {
    const data = await (pairContract?.methods.poolGetOutputReserve as any)(pairAddress, outputToken).call();
    console.log('output reserve : ', data);
    return data;
}

export const exactTokensForTokens = async (pairContract: Contract<any>, pairAddress: string, inputAmount: BigInt, minToken: BigInt, inputToken: string, outputToken: string, user: string) => {
    const block = await (pairContract?.methods.swapExactTokensForTokens as any)(pairAddress, inputAmount, minToken, inputToken, outputToken).send({
        from: user
    })
    console.log(block);
    if(block) return('succeed');
    if(!block) return('failed');
}
export const exactTokensForBNC = async (pairContract: Contract<any>, pairAddress: string, inputAmount: BigInt, minToken: BigInt, inputToken: string, outputToken: string, user: string) => {
    const block = await (pairContract?.methods.swapExactTokensForBNC as any)(pairAddress, inputAmount, minToken, inputToken, outputToken).send({
        from: user
    })
    console.log(block);
    if(block) return('succeed');
    if(!block) return('failed');
}
export const exactBNCForTokens = async (pairContract: Contract<any>, pairAddress: string, inputAmount: BigInt, minToken: BigInt, inputToken: string, outputToken: string, user: string) => {
    const block = await (pairContract?.methods.swapExactBNCForTokens as any)(pairAddress, minToken, inputToken, outputToken).send({
        from: user,
        value: inputAmount
    })
    console.log(block);
    if(block) return('succeed');
    if(!block) return('failed');
}
export const tokensForExactTokens = async (pairContract: Contract<any>, pairAddress: string, outputAmount: BigInt, maxToken: BigInt, inputToken: string, outputToken: string, user: string) => {
    const block = await (pairContract?.methods.swapTokensForExactTokens as any)(pairAddress, outputAmount, maxToken, inputToken, outputToken).send({
        from: user
    })
    console.log(block);
    if(block) return('succeed');
    if(!block) return('failed');
}
export const tokensForExactBNC = async (pairContract: Contract<any>, pairAddress: string, outputAmount: BigInt, maxToken: BigInt, inputToken: string, outputToken: string, user: string) => {
    const block = await (pairContract?.methods.swapTokensForExactBNC as any)(pairAddress, outputAmount, maxToken, inputToken, outputToken).send({
        from: user
    })
    console.log(block);
    if(block) return('succeed');
    if(!block) return('failed');
}
export const bNCForExactTokens = async (pairContract: Contract<any>, pairAddress: string, outputAmount: BigInt, maxToken: BigInt, inputToken: string, outputToken: string, user: string) => {
    const block = await (pairContract?.methods.swapBNCForExactTokens as any)(pairAddress, outputAmount, inputToken, outputToken).send({
        from: user,
        value: maxToken
    })
    console.log(block);
    if(block) return('succeed');
    if(!block) return('failed');
}