import React from "react";
// ! 공통적으로 사용되는 type으로 layout이나 다른 파일에 선언하여 가져와 사용하는게 좋을것같음.
type ReactNodeProps = {
  children: React.ReactNode;
};

const BodyBackground: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    // ! min-width 값 필요할 것으로 예상됨
    // * width: P - 80%, M - 386px / Bg - black불투명도 / Radius-tailwind 커스텀으로 사용
    <div
      className="pc:w-4/5 mobile:w-[386px] bg-[rgba(55,55,55,0.25)] 
    shadow-md: box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25) rounded-xl: rounded-bodyBackRadius pc:p-1 "
    >
      {children}
    </div>
  );
};

export default BodyBackground;
