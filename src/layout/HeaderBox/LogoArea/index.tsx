import { ImgBaseUrl } from "src/features/ImgBaseUrl";

const LogoArea = () => (
  <div className="mobile:block w-[100px] h-full flex justify-center items-center">
    <img className="w-[50px] h-[45px]" src={`${ImgBaseUrl()}BounsIo_LOGO.png`} />
  </div>
);

export default LogoArea;
