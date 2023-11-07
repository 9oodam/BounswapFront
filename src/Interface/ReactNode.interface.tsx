import React from "react";

// GY_Background 컴포넌트가 받을 수 있는 pops를 선언한다.
// React.ReactNode : React 요소(컴포넌트나 JSX 등)을 가리키는 타입이다.
export interface ReactNodeProps {
  children: React.ReactNode;
}

// * 컴포넌트의 display 값을 받는 interface
export interface Display {
  display: string;
}
