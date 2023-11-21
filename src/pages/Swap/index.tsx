import SwapContainer from "../../components/SwapContainer";
import React, { useState } from "react";
import Card from "src/components/Card";
import CustomModal from "./CustomModal";

const Swap = () => {
  return (
    <SwapContainer>
      <div className="flex flex-col items-center">
        <div className="w-[85%] text-baseWhite font-bold [text-shadow:0px_4px_4px_#00000040] text-left text-[35px] mt-7">
          Swap
        </div>
        <Card>
          <div className="text-lightBlack">You pay</div>
          <div className="flex-row items-center">
            <div className="flex">
              <input className="w-[80%] h-[40px] text-xl"></input>
              <CustomModal />
            </div>
          </div>
        </Card>
      </div>
    </SwapContainer>
  );
};

export default Swap;
