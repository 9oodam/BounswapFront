import { Contract } from "web3";

// 유저가 공급 중인 예치량 반환
export const getUserLiquidity = async (pairContract: Contract<any>, pairAddress: string, user: string) => {
  const {amount0, amount1} = await (pairContract?.methods.poolGetUserLiquidity as any)(pairAddress).call({
    from: user
  });
  console.log('유저 예치량 : ', amount0, amount1)
  return {amount0, amount1};
}

// 유동성 공급시 토큰 1:1 계산
export const getPairAmount = async (pairContract: Contract<any>, tokenA: string, tokenB: string, tokenAmount: BigInt) => {
  const data = await (pairContract?.methods.poolGetPairAmount as any)(tokenA, tokenB, tokenAmount).call();
  console.log('tokenB amount : ', data);
  return data;
}
// 유동성 제거시 퍼센테이지 계산
export const getRemoveAmount = async (pairContract: Contract<any>, pairAddress: string, percentage: number, to: string) => {
  const {amount0, amount1} = await (pairContract?.methods.poolGetRemoveAmount as any)(pairAddress, percentage, to).call();
  console.log('token0Amount : ', amount0);
  console.log('token1Amount : ', amount1);
  return {amount0, amount1};
}


// 유동성 공급 (token-token)
export const addLiquidity = async (pairContract: Contract<any>, tokenA: string, tokenB: string, amountADesired: BigInt, amountBDesired: BigInt, user: string) => {
  const block = await (pairContract?.methods.poolAddLiquidity as any)(tokenA, tokenB, amountADesired, amountBDesired).send({
    from: user
  });
  console.log(block);
  // block에 문제 있으면 error 처리할 수 있는 문구 내보내기
  if(block) return('succeed');
  if(!block) return('failed');
}
// 유동성 공급 (bnc-token)
export const addLiquidityBNC = async (pairContract: Contract<any>, token: string, amountTokenDesired: BigInt, amountBNCDesired: BigInt, user: string) => {
  const block = await (pairContract?.methods.poolAddLiquidityBNC as any)(token, amountTokenDesired).send({
    from: user,
    value: amountBNCDesired
  });
  console.log(block);
  if(block) return('succeed');
  if(!block) return('failed');
}
// 유동성 제거 (token-token)
export const removeLiquidity = async (pairContract: Contract<any>, tokenA: string, tokenB: string, percentage: number, user: string) => {
  const block = await (pairContract?.methods.poolRemoveLiquidity as any)(tokenA, tokenB, percentage).send({
    from: user
  });
  console.log(block);
  if(block) return('succeed');
  if(!block) return('failed');
}
// 유동성 제거 (bnc-token)
export const removeLiquidityBNC = async (pairContract: Contract<any>, token: string, percentage: number, user: string) => {
  const block = await (pairContract?.methods.poolRemoveLiquidityBNC as any)(token, percentage).send({
    from: user
  });
  console.log(block);
  if(block) return('succeed');
  if(!block) return('failed');
}

// 유저 미청구 수수료 청구
export const claimFee = async (pairContract: Contract<any>, pairAddress: string, user: string) => {
  const block = await (pairContract?.methods.poolClaimFee as any)(pairAddress).call({
    from: user
  });
  console.log(block);
  if(block) return('succeed');
  if(!block) return('failed');
}