import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { AuthRoutes } from "./AuthRoutes";
import { TabRoutes } from "./TabRoutes";
import { darkTheme } from "../themes/themes";

export function AppRoutes() {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkTheme.primary} />
      </View>
    );
  }

  return signed ? <TabRoutes /> : <AuthRoutes />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: darkTheme.background,
  },
});
