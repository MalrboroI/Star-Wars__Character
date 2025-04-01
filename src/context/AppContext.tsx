import { createContext, useContext, useState } from "react";

type AppContextType = {
  language: "Russian" | "Wookiee";
  toggleLanguage: () => void;
};

const AppContext = createContext<AppContextType>({
  language: "Russian",
  toggleLanguage: () => {},
});

export const useAppContext = () => useContext<AppContextType>(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"Russian" | "Wookiee">("Russian");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "Russian" ? "Wookiee" : "Russian"));
  };

  return (
    <AppContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
