"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface LoggedContextType {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

const LoggedContext = createContext<LoggedContextType | undefined>(undefined);

export function LoggedProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <LoggedContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </LoggedContext.Provider>
  );
}

export function useLogged() {
  const context = useContext(LoggedContext);
  if (context === undefined) {
    throw new Error("useLogged must be used within a LoggedProvider");
  }
  return context;
}
