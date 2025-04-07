import React from "react";
import { Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "././components/Header";
import "./styles/Main.scss";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Header />
      <main className="app__main">
        <Outlet /> {/* Здесь будут рендериться дочерние маршруты */}
      </main>
    </AppProvider>
  );
};

export default App;
