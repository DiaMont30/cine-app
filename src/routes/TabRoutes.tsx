import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../contexts/ThemeContext";
import { Assistidos } from "../pages/Assistidos";
import { Buscar } from "../pages/Buscar";
import { Favoritos } from "../pages/Favoritos";
import { Home } from "../pages/Home";
import { Perfil } from "../pages/Perfil";

export type TabParamList = {
  Inicio: undefined;
  Buscar: undefined;
  Favoritos: undefined;
  Assistidos: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const icons = {
  Inicio: "home-outline",
  Buscar: "search-outline",
  Favoritos: "heart-outline",
  Assistidos: "checkmark-circle-outline",
  Perfil: "person-outline",
} as const;

export function TabRoutes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.surface,
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

      <Tab.Screen name="Assistidos" component={Assistidos} />

      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}