import React from "react";
import LogoArea from "../LogoArea";
import SerchHook from "./SerchHook";

const SearchBox = () => {
  const exampleData = [
    "Apple",
    "Banana",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
    "a",
  ];
  const { searchTerm, setSearchTerm, searchResults } = SerchHook(exampleData);

  return (
    <div className="flex-col relative  justify-center w-[25%] mobile:w-[30%] header:hidden mobile:block">
      <div className="flex">
        <div className="pc:w-[331px] w-full relative h-[46px] rounded-[63px] overflow-hidden border-[3px] border-baseWhite shadow-[0px_4px_5px_#00000040]">
          <img
            className="absolute w-[22px] h-[21px] top-[10px] left-[15px]"
            alt="Search icon"
            src="/images/search.svg"
          />
          <input
            className="absolute w-full h-full left-0 top-0 pl-[48px] pr-3 py-0 opacity-80 [font-family:'Inter-Bold',Helvetica] font-bold text-baseWhite text-[19px] tracking-[0] leading-[normal] placeholder-baseWhite bg-transparent border-none outline-none"
            placeholder="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* <div className="absolute top-full left-0 bg-lime-500 z-10 w-full max-h-[300px] overflow-auto"> */}
      <div className="pc:w-[331px] w-full absolute top-full left-0 bg-lime-500 z-10 max-h-[300px] overflow-auto  border-baseWhite">
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
