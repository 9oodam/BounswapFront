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
import Stake from "./pages/stake";
import StakeDetail from "./pages/StakeDetail";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App ">
        <WagmiConfig config={config}>
          <GradientBg>
            <div className={Divstyle.header_body}>
              <ToggleBtn />
              <HeaderBox />
              <Routes>
                <Route path="/poolpair" element={<Poolpair />} />
                <Route path="/tokendetail" element={<TokenDetail />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/stake/:id" element={<StakeDetail />} />
              </Routes>
            </div>
            <Footer />
          </GradientBg>
        </WagmiConfig>
      </div>
    </QueryClientProvider>
  );
}

export default App;
