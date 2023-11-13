import React from "react";
import { useNavigate } from "react-router-dom";
import { DataArray } from "src/Interface/ReactNode.interface";
import Card from "src/components/Card";

const StakeDashboard: React.FC<{ data: DataArray }> = ({ data }) => {
  const nav = useNavigate();
  return (
    <div className="flex justify-center w-full">
      <Card>
        <table className="w-full text-deepBlack">
          <thead>
            <tr className="border-t-2 border-b-2 h-[50px] text-[18px] ">
              <th>Token name</th>
              <th>Total staked</th>
              <th>Volume(24H)</th>
              <th>APR(30D)</th>
              <th>Your tokens</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr
                className="border-t-2 border-b-2"
                onClick={(e) => {
                  nav(`/stake/${data.tokenCA}`);
                }}
              >
                <td>
                  <div className="flex justify-center items-center">
                    <div className="w-[50px] h-[50px] bg-[#FFFAE0] rounded-full">
                      <img
                        src={data.tokenImg}
                        alt="Logo"
                        className="w-full rounded-full"
                      />
                    </div>
                    <div className="ml-2">{data.tokenName}</div>
                  </div>
                </td>
                <td>{data.totkeStaked}</td>
                <td>{data.volume}</td>
                <td>{data.APR}</td>
                <td>{data.your}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default StakeDashboard;
