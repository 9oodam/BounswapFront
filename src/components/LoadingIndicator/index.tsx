import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="w-full pc:h-[80vh] mobile:h-[70vh] flex items-center justify-center ">
      <div className="pc:w-[400px] pc:h-[400px] mobile:w-[300px] mobile:h-[300px] pc:border-[10px] mobile:border-[8px] border-deepGreen rounded-full shadow-xl">
        <img src="/images/Loading2.gif" alt="Loading" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
