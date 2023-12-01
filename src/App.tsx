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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SNSLogin from "./contents/SNSLogin";
import React, { useEffect, useState } from "react";
import Tokens from "./pages/Tokens";
import Governance from "./pages/Governance";
import useWeb3 from "./hooks/web3.hook";
import AppFooter from "./layout/FooterBox/AppFooter";
// import BounsGetWallet from "./hooks/BounsGetWallet";
import Swap from "./pages/Swap";
import TopDiv from "./components/container/TopDiv";
import Pool from "./pages/Pool";
import CreateProposal from "./pages/Governance/CreateProposal";
import PoolCreate from "./pages/Pool/PoolCreate";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

declare global {
  interface Window {
    ethereum: any;
  }
}

// function App() {
const App: React.FC = () => {
  // const { user, web3 } = useWeb3(window.ethereum);
  // console.log("user", user, "web3", web3);
  const [isSNSLoggedIn, setIsSNSLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const loggedIn = localStorage.getItem("loggedIn");
    setIsSNSLoggedIn(loggedIn === "true");
    // console.log("sdfsdf",window.location.protocol, window.location.host);

    const connectStatus = localStorage.getItem("connectStatus");

    const loggedInStatus = localStorage.getItem("loggedIn");

    if (!connectStatus && loggedInStatus) {
      toast.error("지갑을 연결해주세요");
    }

    if (!loggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    localStorage.setItem("loggedIn", "true");
    setIsSNSLoggedIn(true);
    navigate("/swap"); // 로그인 성공 후 리다이렉트할 경로
  };

  // const address = BounsGetWallet();
  // console.log(address, "address");

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
      />

      <div className="App">
        <div className={Divstyle.header_body}>
          {isSNSLoggedIn && <HeaderBox />}
          {isSNSLoggedIn && <TopDiv />}
          <Routes>
            <Route
              path="/"
              element={
                !isSNSLoggedIn ? (
                  <SNSLogin onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <Swap />
                )
              }
            />
            <Route path="/swap" element={<Swap />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/pool/create" element={<PoolCreate />} />
            <Route path="/pool/top/:id" element={<TopPoolpair />} />
            <Route path="/pool/my/:id" element={<MyPoolpair />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/tokens/:id" element={<TokenDetail />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/stake/:id" element={<StakeDetail />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/governance/create" element={<CreateProposal />} />
          </Routes>
        </div>
        {/* AppFooter 추가(맨 아래 반응형) */}
        {isSNSLoggedIn && <Footer />}
        {isSNSLoggedIn && <AppFooter />}
        {/* </>
        )} */}
      </div>
    </QueryClientProvider>
  );
};

export default App;
