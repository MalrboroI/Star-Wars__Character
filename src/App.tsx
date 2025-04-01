import React from "react";
import { Outlet } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "././components/Header";
// import Navigation from "./components/Utils/Navigation";
import "./styles/Main.scss"; // Общий импорт всех стилей через sass
const App: React.FC = () => {
  return (
    <AppProvider>
      <Header />
      {/* <Navigation /> */}
      <main className="app__main">
        <Outlet /> {/* Здесь будут рендериться дочерние маршруты */}
      </main>
    </AppProvider>
  );
};

export default App;
