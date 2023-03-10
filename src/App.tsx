import React, { useEffect } from "react";
import "./App.scss";
import { useCookies } from "react-cookie";
import { login } from "./api/api";
import { LOGIN, PASSWORD } from "./utils/enviroment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/main";

const App: React.FC = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  useEffect(() => {
    login(LOGIN, PASSWORD).then((response) => {
      setCookie("token", `Bearer ${response.data.access_token}`);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
