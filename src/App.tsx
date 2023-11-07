import "./App.css";
import { Routes, Route } from "react-router-dom";
import Darkmode_Test from "./pages/Darkmode_Test";
import Poolpair from "./pages/poolpair";
import GradientBg from "./components/GradientBg"

function App() {
  return (
    <div className="App">
      <GradientBg>
        <Routes>
          {/* 루트 경로로 signup 페이지가 들어갈 것으로 예상됩니다.
        <Route path="/" element={<Signup/>}/> */}

          {/* ' path="/poolpair:id" ' 이런 식으로 진행될 것이라 예상됩니다. */}
          <Route path="/poolpair" element={<Poolpair />} />
          {/* ------------------------💡 Test Page 💡-------------------------- */}
          {/* <Route path="/darkmode" element={<Darkmode_Test />} /> */}
        </Routes>
      </GradientBg>
      {/* <button className="py-2 px-4 rounded-lg shadow-md text-white bg-blue-500 mobile:bg-green-200">
        Click me
      </button> */}
    </div>
  );
}

export default App;
