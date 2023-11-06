import React from "react";
import TopTitleDiv from "../../components/DivBox/TopTitleDiv";
import TopBlackBox from "./TopBlackBox";

const Pool_TopDetail = () => {
  return (
    <>
      {/* * public 폴더에 있는 파일은 직접 불러올 수 있다. */}
      <img
        src="/images/backArrow.png"
        className=" w-[50px] h-[43px] mb-5"
      ></img>
      <TopTitleDiv></TopTitleDiv>
      <TopBlackBox></TopBlackBox>
    </>
  );
};

export default Pool_TopDetail;
