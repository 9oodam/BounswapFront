import "./App.css";
import { Routes, Route } from "react-router-dom";
import Poolpair from "./pages/poolpair";
import GradientBg from "./components/GradientBg";
import HeaderBox from "./layout/HeaderBox";
import Footer from "./layout/FooterBox";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi-config";
import { Divstyle } from "./App.style";
import ToggleBtn from "./components/toggleBtn";
import TokenDetail from "./pages/tokenDetail";

function App() {
  return (
    <div className="App ">
      <WagmiConfig config={config}>
        <GradientBg>
          <div className={Divstyle.header_body}>
            <ToggleBtn />
            <HeaderBox />
            <Routes>
              <Route path="/poolpair" element={<Poolpair />} />
              <Route path="/tokendetail" element={<TokenDetail />} />
            </Routes>
          </div>
          <Footer />
        </GradientBg>
      </WagmiConfig>
    </div>
  );
}

export default App;
