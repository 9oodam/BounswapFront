import "./App.css";
import { Routes, Route } from "react-router-dom";
import Darkmode_Test from "./pages/Darkmode_Test";
import Poolpair from "./pages/poolpair";
import GradientBg from "./components/GradientBg";
import HeaderBox from "./layout/HeaderBox";
import Footer from "./layout/FooterBox";
import { WagmiConfig } from "wagmi";
import { config } from "../wagmi-config";

function App() {
  return (
    <div className="App ">
      <WagmiConfig config={config}>
        <GradientBg>
          <HeaderBox />
          <Routes>
            {/* ' path="/poolpair:id" ' 이런 식으로 진행될 것이라 예상됩니다. */}
            <Route path="/poolpair" element={<Poolpair />} />
            {/* ------------------------💡 Test Page 💡-------------------------- */}
            <Route path="/darkmode" element={<Darkmode_Test />} />
          </Routes>
          <Footer />
        </GradientBg>
        {/* <button className="py-2 px-4 rounded-lg shadow-md text-white bg-blue-500 mobile:bg-green-200">
        Click me
      </button> */}
      </WagmiConfig>
    </div>
  );
}

export default App;
