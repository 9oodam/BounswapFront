import React from "react";
import { useNavigate } from "react-router-dom";
import {
  DataArray,
  TokenArray,
  DataItem,
  TokenItem,
} from "src/Interface/Token.interface";
import Card from "src/components/Card";

const Dashboard: React.FC<{
  data: (DataItem | TokenItem)[];
  url: string;
  title: string[];
}> = ({ data, url, title }) => {
  const nav = useNavigate();
  return (
    <div className="flex justify-center w-full">
      <Card>
        <table className="w-full text-deepBlack">
          <thead>
            <tr className="border-t-2 border-b-2 h-[50px] text-[18px] ">
              {title.map((el)=>(
                <>
                <th>Token name</th>
                <th>Total staked</th>
                <th className="stakDash:hidden">End Date</th>
                <th className="mobile:hidden">Your tokens</th>
                </>

              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr
                key={index}
                className="border-t-2 border-b-2 cursor-pointer hover:bg-opercityBlack rounded-full h-16"
                onClick={(e) => {
                  if ("tokenCA" in data) {
                    nav(`/${url}/${data.tokenCA}`);
                  } else if ("tokenAddress" in data) {
                    nav(`/${url}/${data.tokenAddress}`);
                  }
                }}
              >
                <td>
                  <div className="flex justify-start items-center pl-5 ">
                    <div className="w-[50px] h-[50px] rounded-full">
                      <img
                        src={"tokenImg" in data ? data.tokenImg : data.uri}
                        alt="Logo"
                        className="w-full rounded-full "
                      />
                    </div>
                    <div>
                      <div className="ml-2">
                        <span className="stakDash:hidden">
                          {"tokenName" in data ? data.tokenName : data.name}
                        </span>
                        <span className="stakDash:hidden"> / </span>
                        <span>
                          {"tokenSymbol" in data
                            ? data.tokenSymbol
                            : data.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{"totalStaked" in data ? data.totalStaked : data.tvl}</td>
                <td className="stakDash:hidden">
                  {"endTime" in data ? data.endTime : data.volume}
                </td>
                <td className="mobile:hidden">
                  {"your" in data ? data.your : data.volume}
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
