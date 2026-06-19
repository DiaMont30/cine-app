import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Buscar } from "../pages/Buscar";
import { Favoritos } from "../pages/Favoritos";
import { Home } from "../pages/Home";
import { darkTheme } from "../themes/themes";

export type TabParamList = {
  Inicio: undefined;
  Buscar: undefined;
  Favoritos: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const icons = {
  Inicio: "home-outline",
  Buscar: "search-outline",
  Favoritos: "heart-outline",
} as const;

export function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: darkTheme.primary,
        tabBarInactiveTintColor: darkTheme.muted,
        tabBarStyle: {
          backgroundColor: darkTheme.surface,
          borderTopColor: darkTheme.surface,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={icons[route.name]} color={color} size={size} />
        ),
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{ title: "Início" }}
      />

      <Tab.Screen name="Buscar" component={Buscar} />

      <Tab.Screen name="Favoritos" component={Favoritos} />
    </Tab.Navigator>
  );
}
