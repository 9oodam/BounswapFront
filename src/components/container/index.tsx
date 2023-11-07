import React from "react";

// ! 공통적으로 사용되는 type으로 layout이나 다른 파일에 선언하여 가져와 사용하는게 좋을것같음.
import { ReactNodeProps } from "../../Interface/ReactNode.interface";
import TopTitleDiv from "../Pairname";
import { Divstyle } from "./container.styled";

const Container: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <>
      <TopTitleDiv />
      <div className={Divstyle.BlackBox}>{children}</div>
    </>
  );
};

export default Container;
