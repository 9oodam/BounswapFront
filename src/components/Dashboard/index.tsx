import React from "react";
import { useNavigate } from "react-router-dom";
import {
  StakeItem,
  TokenItem,
  TokenTitle,
  StakeTitle,
  PairItem,
  PairTitle,
} from "src/Interface/Token.interface";
import Card from "src/components/Card";
import { getTime } from "src/features/getTime";

const Dashboard: React.FC<{
  arr: (StakeItem | TokenItem | PairItem)[];
  url: string;
  title: TokenTitle | StakeTitle | PairTitle;
}> = ({ arr, url, title }) => {
  const nav = useNavigate();
  return (
    <div className="flex justify-center w-full">
      <Card>
        <table className="w-full text-deepBlack">
          <thead>
            <tr className=" border-b-2 h-[50px] text-[18px] ">
              <th className="w-[55%] text-left pl-7">
                {"tokenName" in title
                  ? title.tokenName
                  : "PairName" in title
                  ? title.PairName
                  : title.stakeName}
              </th>
              <th
                className={
                  "tokenTvl" in title || "PairTvl" in title
                    ? "stakDash:hidden w-[15%]"
                    : "pc:w-[15%] "
                }
              >
                {"tokenTvl" in title
                  ? title.tokenTvl
                  : "PairTvl" in title
                  ? title.PairTvl
                  : title.stake}
              </th>
              <th
                className={
                  "tokenVolume" in title || "PairVolume" in title
                    ? "w-[15%]"
                    : "stakDash:hidden pc:w-[15%]"
                }
              >
                {"tokenVolume" in title
                  ? title.tokenVolume
                  : "PairVolume" in title
                  ? title.PairVolume
                  : title.end}
              </th>
              <th
                className={
                  `tokenVolume7D` in title || "PairVolume7D" in title
                    ? `mobile:hidden w-[15%]`
                    : `mobile:hidden w-[15%]`
                }
              >
                {"tokenVolume7D" in title
                  ? title.tokenVolume7D
                  : "PairVolume7D" in title
                  ? title.PairVolume7D
                  : title.yours}
              </th>
            </tr>
          </thead>
          <tbody>
            {arr.map((data, index) => (
              <tr
                key={index}
                className="border-t-2 border-b-2 cursor-pointer hover:bg-opercityBlack rounded-full h-16"
                onClick={(e) => {
                  if ("tokenAddress" in data) {
                    nav(`/${url}/${data.tokenAddress}`);
                  } else if ("pairAddress" in data) {
                    nav(`/${url}/${data.pairAddress}`);
                  } else if ("tokenCA" in data) {
                    nav(`/${url}/${data.tokenCA}`);
                  }
                }}
              >
                <td>
                  <div className="flex justify-start items-center pl-7 ">
                    {"tokenUri" in data || "stakeImg" in data ? (
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          src={
                            "tokenUri" in data
                              ? data.tokenUri
                              : "stakeImg" in data
                              ? data.stakeImg
                              : ""
                          }
                          alt="Logo"
                          className="w-full rounded-full border-[1px] border-gray-300 "
                        />
                      </div>
                    ) : (
                      <div className=" w-[70px] h-[40px] flex relative ">
                        <img
                          src={data.token0Uri}
                          alt="Logo"
                          className="absolute w-[40px] h-[40px] rounded-full border-[1px] border-gray-300"
                        />
                        <img
                          src={data.token1Uri}
                          alt="Logo"
                          className=" absolute w-[40px] h-[40px] rounded-full left-6 border-[1px] border-gray-300"
                        />
                      </div>
                    )}
                    <div>
                      {"tokenName" in data || "stakeName" in data ? (
                        <div className="ml-2">
                          <span className="stakDash:hidden">
                            {"tokenName" in data
                              ? data.tokenName
                              : data.stakeName}
                          </span>
                          <span className="stakDash:hidden"> / </span>
                          <span>
                            {"tokenSymbol" in data
                              ? data.tokenSymbol
                              : data.stakeSymbol}
                          </span>
                        </div>
                      ) : (
                        <div className="ml-2">
                          <span className="">{data.token0Symbol}</span>
                          <span className=""> / </span>
                          <span>{data.token1Symbol}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td
                  className={
                    "tokenTvl" in data || "pairTvl" in data
                      ? "stakDash:hidden"
                      : ""
                  }
                >
                  {"tokenTvl" in data
                    ? data.tokenTvl
                    : "pairTvl" in data
                    ? data.pairTvl
                    : data.totalStaked}
                </td>
                <td
                  className={
                    "tokenVolume" in data || "pairVolume" in data
                      ? ""
                      : "stakDash:hidden"
                  }
                >
                  {"tokenVolume" in data
                    ? data.tokenVolume
                    : "pairVolume" in data
                    ? data.pairVolume
                    : getTime(data.endTime)}
                </td>
                <td
                  className={
                    "tokenVolume" in data || "pairVolume" in data
                      ? "mobile:hidden"
                      : "mobile:hidden"
                  }
                >
                  {"tokenVolume" in data
                    ? data.tokenVolume
                    : "pairVolume" in data
                    ? data.pairVolume
                    : data.your}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Dashboard;
