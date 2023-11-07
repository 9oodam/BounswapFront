import React from "react";

const Footer = (): JSX.Element => {
  return (
    <footer className="relative w-4/5 mx-auto h-[129px] border-t border-[#6b7d63cc] p-4 mt-[150px]">
      <div className="flex justify-between items-start">
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
      </div>
    </footer>
  );
};

export default Footer;
