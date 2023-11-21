import React from "react";
import LogoArea from "../HeaderBox/LogoArea";
import ToggleBtn from "src/components/toggleBtn";
import GithubArea from "./GithubArea";

const Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-row justify-between w-full mx-auto h-[100px] bg-[#6b7d63cc] p-4 mt-[150px]">
      <LogoArea />
      <div className="flex items-center justify-between">
        <GithubArea name="9oodam" address="https://github.com/9oodam" />
        <GithubArea name="ahyeona" address="https://github.com/ahyeona" />
        <GithubArea name="wijiwon" address="https://github.com/wijiwon" />
        <GithubArea name="youdonghee" address="https://github.com/youdonghee" />
        <GithubArea name="Jisub_Hwang" address="https://github.com/jisub12" />
      </div>
      <ToggleBtn />
      {/* <div className="flex justify-between items-start">
        <p className="text-left text-[#6b7d63cc] text-[12px]">
          상호: 주식회사 바운스코드
          <br />
          주소: 서울시 영등포구 당산로41길 11 당산 SK V1 center E동 1006호
          <br />
          대표자: 박경식 | 전화번호: 02-2697-6723 | 사업자등록번호: 607-88-01093
          <br />
          통신판매업 신고번호: 제 2018-서울강서-1817 호
          <br />
          <a
            href="mailto:support@bouncecode.io"
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            support@bouncecode.io
          </a>
        </p>
        <img className="w-[102px] h-[49px]" src="icon-box.png" alt="Icon box" />
      </div> */}
    </footer>
  );
};

export default Footer;
