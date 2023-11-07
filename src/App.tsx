import "./App.css";
import { Routes, Route } from "react-router-dom";
import Pool_TopDetail from "./pages/poolDetail/Pool_TopDetail";
import Darkmode_Test from "./pages/Darkmode_Test";
import GY_Background from "./components/GradientBackground/GY_Background";
import HeaderBox from "./components/layout/HeaderBox";
import Footer from "./components/layout/FooterBox";

function App() {
  return (
    <div className="App ">
      <GY_Background>
        <HeaderBox />
        <Routes>
          {/* ' path="/pool:id" ' 이런 식으로 진행될 것이라 예상됩니다. */}
          <Route path="/apool" element={<Pool_TopDetail />} />
          <Route path="/darkmode" element={<Darkmode_Test />} />
        </Routes>
        <Footer />
      </GY_Background>

      {/* <button className="py-2 px-4 rounded-lg shadow-md text-white bg-blue-500 mobile:bg-green-200">
        Click me
      </button> */}
    </div>
  );
}

export default App;
