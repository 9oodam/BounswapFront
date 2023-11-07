import { ReactNode, MouseEvent } from "react";
import { ReactNodeProps } from "./ReactNode.interface";

// * background color와 Click 이벤트를 설정하는 interface
export interface LiquidityTapProps extends ReactNodeProps {
  backgroundColor: string,
  // * 매개변수 e는 div 요소에서 발생한 마우스 이벤트이고, 아무것도 반환하지 않는(void) 함수
  onClick: (e: MouseEvent<HTMLDivElement>) => void,
  id: string,
  textColor: string,
  textweight: string,
};

// interface 와 type 에 차이 알아오셈
