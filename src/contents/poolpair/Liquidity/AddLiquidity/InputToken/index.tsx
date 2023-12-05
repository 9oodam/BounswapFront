import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";
import { Divstyle, Inputstyle } from "./InputToken.style";

const index: React.FC<InputTokenProps> = ({
  tokenName,
  value,
  setInputAmount,
  setExact,
  exact,
  regex,
}) => {
  const borderLeft = tokenName ? "border-l-2" : "border-l-0";

  return (
    <div className={Divstyle.box}>
      <input
        onChange={(e) => {
          if (regex?.test(e.target.value) || e.target.value == "") {
            setInputAmount?.(e.target.value);
            if (setExact) {
              if (exact == true || exact == false) {
                setExact(exact);
              }
            }
          }
          else {
            alert("정수만 입력해 주세요!");
          }
        }}
        className={Inputstyle.size}
        value={value}
      ></input>
      <div className={`${Divstyle.tokenName} ${borderLeft}`}>{tokenName}</div>
    </div>
  );
};

export default index;
