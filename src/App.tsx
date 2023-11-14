import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Poolpair from "./pages/poolpair";
import HeaderBox from "./layout/HeaderBox";
import Footer from "./layout/FooterBox";
import { Divstyle } from "./App.style";
import ToggleBtn from "./components/toggleBtn";
import TokenDetail from "./pages/tokenDetail";
import Stake from "./pages/stake";
import StakeDetail from "./pages/StakeDetail";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect, useState } from "react";
import SNSLogin from "./contents/SNSLogin";

const queryClient = new QueryClient();

function App() {
  const [isSNSLoggedIn, setIsSNSLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get("access_token");
    const refreshToken = url.searchParams.get("refresh_token");

    if (accessToken && refreshToken) {
      // 토큰 처리 로직
      setIsSNSLoggedIn(true);
      // 필요한 경우 리다이렉션
      navigate("/main"); // 예시 경로
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    localStorage.setItem("loggedIn", "true");
    setIsSNSLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App ">
        {/* <<<<<<< HEAD */}
        {!isSNSLoggedIn ? (
          <SNSLogin onLoginSuccess={() => setIsSNSLoggedIn(true)} />
        ) : (
          <>
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
          </>
        )}
        {/* // =======
//         <WagmiConfig config={config}>
//           <div className={Divstyle.header_body}>
//             <ToggleBtn />
//             <HeaderBox />
//             <Routes>
//               <Route path="/poolpair" element={<Poolpair />} />
//               <Route path="/tokendetail" element={<TokenDetail />} />
//               <Route path="/stake" element={<Stake />} />
//               <Route path="/stake/:id" element={<StakeDetail />} />
//             </Routes>
//           </div>
//           <Footer />
//         </WagmiConfig>
// >>>>>>> origin/main */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
