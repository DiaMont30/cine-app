import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import { FavoritosProvider } from "./src/contexts/FavoritosContext";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import { AppRoutes } from "./src/routes/AppRoutes";

function AppContent() {
  const { isDark, theme } = useTheme();
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FavoritosProvider>
          <NavigationContainer>
            <StatusBar style={isDark ? "light" : "dark"} backgroundColor={theme.background} />
            <AppRoutes />
          </NavigationContainer>
        </FavoritosProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
