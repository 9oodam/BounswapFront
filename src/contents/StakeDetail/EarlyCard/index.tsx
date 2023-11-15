import React from "react";
import Card from "src/components/Card";
import { EarlyInfo, EarlyArray } from "src/Interface/Token.interface";
import "./EarlyCard.style.css";

const EarlyCard: React.FC<{ data: EarlyArray }> = ({ data }) => {
  return (
    <div className="w-[85%] text-baseWhite p-7">
      <h3
        className="font-bold text-[25px] text-left mb-5 "
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
      >
        Early Withdrawal History
      </h3>
      <div className="grid grid-cols-3 w-full text-baseWhite font-bold text-[20px] border-b-2 mb-3">
        <div>Timestamp</div>
        <div>Token Amount</div>
        <div>Unclaimed Rewards</div>
      </div>
      <div className="grid grid-cols-1 gap-2 overflow-auto scrollbar overflow-y-scroll w-full h-60 text-baseWhite">
        {data.map((el, index) => (
          <div className="w-full flex justify-around">
            <span className="w-[30%]">{el.time}</span>
            <span className="w-[30%]">
              {el.LPtoken} {el.symbol}
            </span>
            <span className="w-[30%]">{el.reword}</span>
          </div>
        ))}
      </div>
    </div>
  );
  // return (
  //   <div className="w-[85%] text-baseWhite border-2 p-7">
  //     <h3
  //       className="font-bold text-[25px] text-left mb-5 "
  //       style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
  //     >
  //       Early Withdrawal History
  //     </h3>
  //     <table className="w-full">
  //       <thead className="border-b-2">
  //         <tr>
  //           <th>Timestamp</th>
  //           <th>Token Amount</th>
  //           <th>Unclaimed Rewards</th>
  //         </tr>
  //       </thead>
  //     </table>
  //     <div className="border-2 max-h-20 w-full overflow-y-scroll overflow-hidden">
  //       <table className="w-full">
  //         <tbody>
  //           {data.map((el, index) => (
  //             <tr className="h-10">
  //               <td>{el.time}</td>
  //               <td>
  //                 {el.LPtoken} {el.symbol}
  //               </td>
  //               <td>{el.reword}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default EarlyCard;
