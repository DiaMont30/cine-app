import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import { FavoritosProvider } from "./src/contexts/FavoritosContext";
import { AppRoutes } from "./src/routes/AppRoutes";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FavoritosProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <AppRoutes />
          </NavigationContainer>
        </FavoritosProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
