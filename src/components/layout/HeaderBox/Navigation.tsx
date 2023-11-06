import React from "react";

const Navigation = () => (
  <div className="relative w-[334px] h-px">
    <div className="fixed w-[342px] h-px top-0 left-0">
      <div className="left-[277px] text-white absolute h-px top-0 [font-family:'Roboto-Bold',Helvetica] font-bold text-[22px] text-center tracking-[0] leading-[0.1px]">
        Stake
      </div>
      <div className="left-[190px] text-white absolute h-px top-0 [font-family:'Roboto-Bold',Helvetica] font-bold text-[22px] text-center tracking-[0] leading-[0.1px]">
        Pools
      </div>
      <div className="left-[85px] text-white absolute h-px top-0 [font-family:'Roboto-Bold',Helvetica] font-bold text-[22px] text-center tracking-[0] leading-[0.1px]">
        Tokens
      </div>
      <div className="left-0 text-[#338415] absolute h-px top-0 [font-family:'Roboto-Bold',Helvetica] font-bold text-[22px] text-center tracking-[0] leading-[0.1px]">
        Swap
      </div>
    </div>
  </div>
);

export default Navigation;
