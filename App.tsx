import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritosProvider } from "./src/contexts/FavoritosContext";
import { StackRoutes } from "./src/routes/StackRoutes";

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritosProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <StackRoutes />
        </NavigationContainer>
      </FavoritosProvider>
    </SafeAreaProvider>
  );
}
