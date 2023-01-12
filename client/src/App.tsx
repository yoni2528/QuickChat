import React, { useContext, useEffect } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "./store/context";

import useDatabseRequests from "./api/DatabaseRequests/useDatabseRequests";

import { Login, Signup, Chat, ChooseAvatar } from "./routes/index";
import { Spinner, ErrorModal } from "./components/index";

const App = () => {
  const { handleSetToken, handleSetUser } = useContext(UserContext);
  const { handleGetMe } = useDatabseRequests();

  const navigate = useNavigate();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");

    if (token) {
      handleSetToken(token);
      handleGetMe.mutateAsync(token).then((data) => {
        handleSetUser(data.user);
        navigate("/chat");
      });
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogin = (token: string, action: string) => {
    if (action === "login") {
      handleSetToken(token);
      navigate("/chat");
    }
    if (action === "signup") {
      handleSetToken(token);
      localStorage.setItem("token", token);
      navigate("/avatar");
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
        <Route path="/signup" element={<Signup handleLogin={handleLogin} />}></Route>
        <Route path="/avatar" element={<ChooseAvatar />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
      </Routes>
      <Spinner />
      <ErrorModal />
    </div>
  );
};

export default App;
