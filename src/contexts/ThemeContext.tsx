import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "../themes/themes";
import { buscarTema, salvarTema } from "../data/storage";

type ThemeMode = "dark" | "light" | "system";

type ThemeContextData = {
  theme: Theme;
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    buscarTema().then((temaSalvo) => {
      if (temaSalvo === "dark" || temaSalvo === "light" || temaSalvo === "system") {
        setModeState(temaSalvo as ThemeMode);
      }
    });
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    salvarTema(newMode);
  }, []);

  const resolvedMode =
    mode === "system" ? (systemColorScheme ?? "dark") : mode;

  const theme = resolvedMode === "dark" ? darkTheme : lightTheme;
  const isDark = resolvedMode === "dark";

  const toggleTheme = useCallback(() => {
    const nextMode = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(nextMode);
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider value={{ theme, mode, isDark, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
}