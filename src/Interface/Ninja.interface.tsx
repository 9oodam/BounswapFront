// 탈주닌자 이벤트 구독 인터페이스
export interface EmergencyData {
  ninja: string;
  totalLPToken: number;
  totalNinjaReward: number;
  stakingLeftTime: number;
  ninjaRewardRate: number;
}
export type EmergencyEventArr = EmergencyData[];
