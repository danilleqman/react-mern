import React from "react";
import Container from "@material-ui/core/Container";
import { Routes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Header } from "./components/Header";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const { login, userId, token, logout, ready } = useAuth();
  const isAuth = !!token;
  if (!ready) {
    return <CircularProgress color={"primary"} size={"200px"} />;
  }
  return (
    <AuthContext.Provider value={{ login, userId, token, logout, isAuth }}>
      <Header isAuth={isAuth} />
      <Container>
        <Routes isAuth={isAuth} />
      </Container>
    </AuthContext.Provider>
  );
}

export default App;
