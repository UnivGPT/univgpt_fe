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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
