import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Detalhes } from "../pages/Detalhes";
import { TabRoutes } from "./TabRoutes";

export type RootStackParamList = {
  Principal: undefined;
  Detalhes: {
    id: number;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Principal" component={TabRoutes} />
      <Stack.Screen name="Detalhes" component={Detalhes} />
    </Stack.Navigator>
  );
}