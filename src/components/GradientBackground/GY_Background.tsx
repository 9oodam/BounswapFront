import React from "react";

// GY_Background 컴포넌트가 받을 수 있는 pops를 선언한다.
// React.ReactNode : React 요소(컴포넌트나 JSX 등)을 가리키는 타입이다.
type ReactNodeProps = {
  children: React.ReactNode;
};

const GY_Background: React.FC<ReactNodeProps> = ({ children }) => {
  return <div className="w-full h-full bg-green-yellow">{children}</div>;
};

export default GY_Background;
