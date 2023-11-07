import React from "react";

const SearchBox = () => (
  <div className="absolute w-[331px] h-[46px] top-[23px] left-[534px]">
    <div className="relative h-[46px] rounded-[63px] overflow-hidden border-[3px] border-solid border-white shadow-[0px_4px_5px_#00000040]">
      <img
        className="absolute w-[22px] h-[21px] top-[10px] left-[15px]"
        alt="Search icon"
        src="/images/search.svg"
      />
      <input
        className="absolute w-full h-full left-0 top-0 pl-[48px] pr-3 py-0 opacity-80 [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[19px] tracking-[0] leading-[normal] placeholder-white bg-transparent border-none"
        placeholder="Search"
        type="text"
      />
    </div>
  </div>
);

export default SearchBox;
