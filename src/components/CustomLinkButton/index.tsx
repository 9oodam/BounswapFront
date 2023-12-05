import { Link } from "react-router-dom";
import { CustomLinkProps } from "../../Interface/Button.interface";

const CustomLinkButton = ({ to, children }: CustomLinkProps) => {
  return (
    <div className="w-[85%] flex justify-end items-center">
      <Link
        to={to}
        className="pc:w-[200px] h-[40px] mobile:w-[120px] bg-lightGreen font-bold text-white
        flex items-center justify-center hover:bg-deepGreen cursor-pointer shadow-md
        pc:text-[20px] mobile:text-[14px] rounded-xl"
      >
        {children}
      </Link>
    </div>
  );
};

export default CustomLinkButton;
