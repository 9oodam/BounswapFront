import { QueryClient } from "@tanstack/react-query";
import { Contract } from "web3";

interface Params {
  stakingContract: Contract<any> | null;
  user: {
    account: string;
    balance: string;
  };
  amount: any;
  web3: any;
}

interface withdrawParams {
  stakingContract: Contract<any> | null;
  user: {
    account: string;
    balance: string;
  };
}
// 예치
export const deposit = async ({
  stakingContract,
  user,
  amount,
  web3,
}: Params) => {
  try {
    const _pid = 0;
    const strChange = await web3?.utils.toBigInt(
      web3?.utils.toWei(amount, "ether")
    );
    await (stakingContract?.methods.deposit as any)(_pid, strChange).send({
      from: user.account,
      gasPrice: 25000000000
    });
  } catch (error) {
    // console.log(error);
    return('error');
  }
};
// 탈주
export const emergencyWithdraw = async ({
  stakingContract,
  user,
}: withdrawParams) => {
  try {
    const _pid = 0;
    await (stakingContract?.methods.emergencyWithdraw as any)(_pid).send({
      from: user.account,
      gasPrice: 25000000000
    });
  } catch (error) {
    console.log();
    return('error');
  }
};
// 만기 출금
export const maturedWithdraw = async ({
  stakingContract,
  user,
}: withdrawParams) => {
  try {
    const _pid = 0;
    await (stakingContract?.methods.maturedWithdraw as any)(_pid).send({
      from: user.account,
      gasPrice: 25000000000
    });
  } catch (error) {
    // console.log(error);
    return('error');
  }
};
////////////////////////// 스테이킹 끝나는 날짜변경(테스트용)
export const setStakingEndDays = async ({
  stakingContract,
  user,
}: withdrawParams) => {
  try {
    const _pid = 0;
    const _days = 10; //  1 = 1초
    await (stakingContract?.methods.setStakingEndDays as any)(_pid, _days).send(
      { from: user.account, gasPrice: 25000000000 }
    );
  } catch (error) {
    // console.log(error);
    return('error');
  }
};

export const addStakingPool = async ({
  stakingContract,
  user,
}: withdrawParams) => {
  try {
    const _allocPoint = 10000;
    const _endDays = 30;
    const _lpToken = '0x316Ce4d255b75D1320FF7eCE9d5eDb231eaF89C4';
    await (stakingContract?.methods.addStakingPool as any) (_allocPoint, _lpToken, _endDays).send(
      {from: user.account, gasPrice: 25000000000}
    );
  } catch (error) {
    // console.log(error);
    return ('error');
  }
}
