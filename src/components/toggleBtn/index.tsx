import React, { useEffect, useState } from "react";
import { ImgBaseUrl } from "src/features/ImgBaseUrl";
const Index = () => {
  const [dark, setDark] = useState("");
  const [isChecked, setIsChecked] = useState(localStorage.theme === "dark");

  useEffect(() => {
    setDark(localStorage.theme);
    console.log("isChecked", isChecked);
  }, []);
  const Click = () => {
    // 현재 다크모드인지 확인
    var isDarkMode = document.documentElement.classList.contains("dark");
    console.log("isDarkMode", isDarkMode);
    // setDark(localStorage.theme);
    // 다크모드면 라이트모드로, 라이트모드면 다크모드로 변경
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDark("light");
      setIsChecked(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDark("dark");
      setIsChecked(true);
    }
  };

  // 페이지 로드 시 이전에 설정한 테마 적용
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <div className="flex pc:justify-end mobile:justify-center mt-0 mobile:mt-7">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          onChange={Click}
          type="checkbox"
          checked={isChecked}
          className="sr-only peer"
        />
        <div className="w-20 h-10 items-center peer-focus:outline-none pc:ring-4 mobile:ring-4 ring-baseWhite dark:ring-lightBlack dark:peer-focus:ring-lightBlack rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute pc:after:top-[18px] mobile:after:top-[4px] after:left-[8.5px] after:bg-white dark:after:bg-lightBlack after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all dark:border-gray-600">
          <div
            className={`ransform -translate-y-1/2 top-1/2 absolute ${
              isChecked ? `left-1` : `right-1`
            }`}
          >
            <img
              src={
                dark == "dark"
                  ? `${ImgBaseUrl()}sun_toggle.png`
                  : `${ImgBaseUrl()}moon_toggle.png`
              }
              alt={dark == "dark" ? "moon" : "sun"}
              className={`w-8 flex `}
            />
          </div>
        </div>
      </label>
    </div>
  );
};

export default Index;
