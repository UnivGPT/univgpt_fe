import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import InfoEditPage from "./routes/InfoEditPage";
import MyPage from "./routes/MyPage";
import SignUpPage from "./routes/SignUpPage";
import SignInPage from "./routes/SignInPage";
import PromptDetailPage from "./routes/PromptDetailPage";
import PromptEditPage from "./routes/PromptEditPage";
import PromptMakePage from "./routes/PromptMakePage";
import KakaoCallback from "./routes/KakaoCallBack";
import InfoCheck from "./routes/InfoCheck";
import NaverCallBack from "./routes/NaverCallBack";
import GoogleCallBack from "./routes/GoogleCallBack";
import PromptResult from "./routes/PromptResultPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/infoedit" element={<InfoEditPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/:promptId" element={<PromptDetailPage />} />
          <Route path="/:promptId/edit" element={<PromptEditPage />} />
          <Route path="/:promptId/make" element={<PromptMakePage />} />
          <Route path="/infocheck" element={<InfoCheck />} />
          <Route path="api/auth/callback/naver" element={<NaverCallBack />} />
          <Route path="api/auth/callback/google" element={<GoogleCallBack />} />
          <Route path="api/auth/callback/kakao" element={<KakaoCallback/>} />
          <Route path="/promptresult" element={<PromptResult/>} />
        </Routes>
      </BrowserRouter>
      {/*InfoPassword랑 InfoEdit, promptresult, prompt edit 등등은 나중에 url userId별로 바꿔야 함! 지금은 그냥 디자인 들어가서 보려고 이렇게 해놨어유*/}
    </div>
  );
}

export default App;
