import "./App.css";
import { Routes, Route } from "react-router-dom";
import Poolpair from "./pages/poolpair";
import GradientBg from "./components/GradientBg";
import HeaderBox from "./components/layout/HeaderBox";
import Footer from "./components/layout/FooterBox";
import { Divstyle } from "./App.style";
import ToggleBtn from "./components/toggleBtn";
import TokenDetail from "./pages/tokenDetail";

function App() {
  return (
    <div className="App ">
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
    </div>
  );
}

export default App;
