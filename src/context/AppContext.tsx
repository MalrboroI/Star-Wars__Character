import { createContext, useContext, useState } from "react";

type AppContextType = {
  language: "english" | "wookiee";
  toggleLanguage: () => void;
};

const AppContext = createContext<AppContextType>({
  language: "english",
  toggleLanguage: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"english" | "wookiee">("english");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "wookiee" : "english"));
  };

  return (
    <AppContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
};
