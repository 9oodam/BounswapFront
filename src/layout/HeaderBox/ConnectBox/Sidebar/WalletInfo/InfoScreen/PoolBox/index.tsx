import React from "react";
import useWeb3 from "src/hooks/web3.hook";
import { useNavigate } from "react-router-dom";
import { PairArray } from "src/Interface/Token.interface";
import { Divstyle } from "../../../../../../../components/Pairname/Pairname.style";

const PoolBox: React.FC<{ pools: PairArray }> = ({ pools }) => {
  const nav = useNavigate();

  return (
    <div>
      <div className="w-full pc:p-5 mobile:mt-5 pc:h-[500px] mobileSiedbar:h-[260px]">
        <div className="flex flex-col justify-start overflow-auto h-full mobileSiedbar:h-full overflow-y-scroll sideBarScrollbar ">
          {pools.map((el, index) => (
            <div
              key={index}
              onClick={() => {
                nav(`/pool/my/${el.pairAddress}`);
              }}
            >
              <div className="flex justify-start items-center h-[68px] pr-[10px] pl-[10px]">
                <div className="w-[30%] flex justify-center items-center">
                  <div className={Divstyle.SideBarLogoPair}>
                    <img
                      src={el.token0Uri}
                      className={Divstyle.SideBarLogoLeft}
                    ></img>
                    <img
                      src={el.token1Uri}
                      className={Divstyle.SideBarLogoRight}
                    ></img>
                  </div>
                </div>
                <div className="w-[30%] h-[36px] flex justify-center items-center">
                  {el.token0Symbol} - {el.token1Symbol}
                </div>
                <div className="w-[40%] h-[36px] flex justify-center items-center">
                  {el.pairBalance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoolBox;
