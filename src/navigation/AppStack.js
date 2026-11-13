import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ExploreScreen from "../screens/ExploreScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Mis Destinos" }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Mapa Interactivo" }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ title: "Historial" }}
      />
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ title: "Comunidad" }}
      />
    </Stack.Navigator>
  );
}
