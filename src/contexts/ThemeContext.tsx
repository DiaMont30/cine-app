import React, { createContext, useCallback, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "../themes/themes";

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
  const [mode, setMode] = useState<ThemeMode>("system");

  const resolvedMode =
    mode === "system" ? (systemColorScheme ?? "dark") : mode;

  const theme = resolvedMode === "dark" ? darkTheme : lightTheme;
  const isDark = resolvedMode === "dark";

  const toggleTheme = useCallback(() => {
    setMode((current) => {
      if (current === "system") return "light";
      if (current === "light") return "dark";
      return "system";
    });
  }, []);

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