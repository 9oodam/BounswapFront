import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import TopPoolpair from "./pages/TopPoolpair";
import MyPoolpair from "./pages/MyPoolpair";
import HeaderBox from "./layout/HeaderBox";
import Footer from "./layout/FooterBox";
import { Divstyle } from "./App.style";
import ToggleBtn from "./components/toggleBtn";
import TokenDetail from "./pages/tokenDetail";
import Stake from "./pages/stake";
import StakeDetail from "./pages/StakeDetail";
import { QueryClient, QueryClientProvider } from "react-query";
import SNSLogin from "./contents/SNSLogin";
import React, { useEffect, useState } from "react";
import Tokens from "./pages/Tokens";
import Governance from "./pages/Governance";
import useWeb3 from "./hooks/web3.hook";
// import BounsGetWallet from "./hooks/BounsGetWallet";

const queryClient = new QueryClient();

declare global {
  interface Window {
    ethereum: any;
  }
}

// function App() {
const App: React.FC = () => {
  const { user, web3 } = useWeb3(window.ethereum);
  console.log("user", user, "web3", web3);
  const [isSNSLoggedIn, setIsSNSLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const loggedIn = localStorage.getItem("loggedIn");
    setIsSNSLoggedIn(loggedIn === "true");

    if (!loggedIn) {
      navigate(`${SNSLogin}`);
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    localStorage.setItem("loggedIn", "true");
    setIsSNSLoggedIn(true);
    navigate("/poolpair"); // 로그인 성공 후 리다이렉트할 경로
  };

  // const address = BounsGetWallet();
  // console.log(address,"address");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {!isSNSLoggedIn ? (
          <SNSLogin onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <div className={Divstyle.header_body}>
              <HeaderBox />
              <Routes>
                <Route path="/poolpair/top" element={<TopPoolpair />} />
                <Route path="/poolpair/my" element={<MyPoolpair />} />
                <Route path="/tokens" element={<Tokens />} />
                <Route path="/tokendetail" element={<TokenDetail />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/stake/:id" element={<StakeDetail />} />
                <Route path="/governance" element={<Governance />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
