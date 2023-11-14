import React from "react";
import { TitleNumInterface } from "src/Interface/Token.interface";

const VolumeCard: React.FC<TitleNumInterface> = ({ title, value }) => {
  return (
    <div className="flex flex-col min-w-[30%] bg-cardWhite dark:bg-D_cardWhite rounded-xl: rounded-bodyBackRadius m-5 shadow-md p-5">
      <div className="text-left text-deepBlack mb-4">{title}</div>
      <div className="text-right font-bold text-deepGreen text-[20px]">
        {value}
      </div>
    </div>
  );
};

export default VolumeCard;
