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

import "./App.css";

function App() {
  return (
    <div className="App overflow-hidden">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/infoedit" element={<InfoEditPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/promptdetail/:promptId"
            element={<PromptDetailPage />}
          />
          <Route path="/promptedit/:promptId" element={<PromptEditPage />} />
          <Route path="/promptmake" element={<PromptMakePage />} />

          <Route path="/infocheck" element={<InfoCheck />} />
          <Route path="api/auth/callback/naver" element={<NaverCallBack />} />
          <Route path="api/auth/callback/google" element={<GoogleCallBack />} />
          <Route path="api/auth/callback/kakao" element={<KakaoCallback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
