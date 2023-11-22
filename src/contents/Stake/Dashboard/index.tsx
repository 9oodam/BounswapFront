import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DataItem,
  TokenItem,
  TokenTitle,
  StakeTitle,
} from "src/Interface/Token.interface";
import Card from "src/components/Card";
import { getTime } from "src/features/getTime";

const Dashboard: React.FC<{
  arr: (DataItem | TokenItem)[];
  url: string;
  title: TokenTitle | StakeTitle;
}> = ({ arr, url, title }) => {
  const nav = useNavigate();
  return (
    <div className="flex justify-center w-full">
      <Card>
        <table className="w-full text-deepBlack">
          <thead>
            <tr className=" border-b-2 h-[50px] text-[18px] ">
              <th className="w-[55%] text-left pl-7">
                {"tokenName" in title ? title.tokenName : title.stakeName}
              </th>
              <th
                className={
                  "tvl" in title ? "stakDash:hidden w-[15%]" : "pc:w-[15%] "
                }
              >
                {"tvl" in title ? title.tvl : title.stake}
              </th>
              <th
                className={
                  "volume" in title ? "w-[15%]" : "stakDash:hidden pc:w-[15%]"
                }
              >
                {"volume" in title ? title.volume : title.end}
              </th>
              <th
                className={
                  `volume7D` in title
                    ? `mobile:hidden w-[15%]`
                    : `mobile:hidden w-[15%]`
                }
              >
                {"volume7D" in title ? title.volume7D : title.yours}
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
                  } else if ("tokenCA" in data) {
                    nav(`/${url}/${data.tokenCA}`);
                  }
                }}
              >
                <td>
                  <div className="flex justify-start items-center pl-7 ">
                    <div className="w-[40px] h-[40px] rounded-full">
                      <img
                        src={"uri" in data ? data.uri : data.tokenImg}
                        alt="Logo"
                        className="w-full rounded-full "
                      />
                    </div>
                    <div>
                      <div className="ml-2">
                        <span className="stakDash:hidden">
                          {"name" in data ? data.name : data.tokenName}
                        </span>
                        <span className="stakDash:hidden"> / </span>
                        <span>
                          {"symbol" in data ? data.symbol : data.tokenSymbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className={"tvl" in data ? "stakDash:hidden" : ""}>
                  {"tvl" in data ? data.tvl : data.totalStaked}
                </td>
                <td className={"tokenVolume" in data ? "" : "stakDash:hidden"}>
                  {"tokenVolume" in data
                    ? data.tokenVolume
                    : getTime(data.endTime)}
                </td>
                <td
                  className={
                    "tokenVolume" in data ? "mobile:hidden" : "mobile:hidden"
                  }
                >
                  {"tokenVolume" in data ? data.tokenVolume : data.your}
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
