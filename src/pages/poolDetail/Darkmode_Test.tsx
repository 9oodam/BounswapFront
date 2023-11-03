import React, { useEffect } from "react";

const Darkmode_Test = () => {
  useEffect(() => {
    console.log(localStorage.them);
  }, []);
  const Click = () => {
    // 현재 다크모드인지 확인
    var isDarkMode = document.documentElement.classList.contains("dark");
    console.log("isDarkMode", isDarkMode);
    // 다크모드면 라이트모드로, 라이트모드면 다크모드로 변경
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
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
    <>
      <div>Darkmode_Test</div>
      <button onClick={Click}>💛</button>
      <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl ">
        <div>
          <span className="mobile:bg-red-300 inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg ">
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              asd
            </svg>
          </span>
        </div>
        <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
          Writes Upside-Down
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          The Zero Gravity Pen can be used to write in any orientation,
          including upside-down. It even works in outer space.
        </p>
      </div>
    </>
  );
};

export default Darkmode_Test;
