import React from "react";
import "./App.css";
import Routes from "./routes/Routes";
import AuthProvider from "./context/AuthProvider";
const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
export default App;
