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
import SNSLogin from "./contents/SNSLogin";
import React, { useEffect, useState } from "react";

const queryClient = new QueryClient();

// function App() {
const App: React.FC = () => {
  const [isSNSLoggedIn, setIsSNSLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const loggedIn = localStorage.getItem("loggedIn");
    setIsSNSLoggedIn(loggedIn === "true");

    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    localStorage.setItem("loggedIn", "true");
    setIsSNSLoggedIn(true);
    navigate("/poolpair"); // 로그인 성공 후 리다이렉트할 경로
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<SNSLogin onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/poolpair" element={<Poolpair />} />
          <Route path="/tokendetail" element={<TokenDetail />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/stake/:id" element={<StakeDetail />} />
          {/* 추가 라우트 설정 */}
        </Routes>
        <div className={Divstyle.header_body}>
          <ToggleBtn />
          <HeaderBox />
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
