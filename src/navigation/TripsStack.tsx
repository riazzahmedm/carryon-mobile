import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTripsScreen from "../screens/trips/MyTripsScreen";
import TripDetailsScreen from "../screens/trips/TripDetailsScreen";

const Stack = createNativeStackNavigator();

export default function TripsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTrips"
        component={MyTripsScreen}
        options={{ title: "My Trips" }}
      />
      <Stack.Screen
        name="TripDetails"
        component={TripDetailsScreen}
         options={{ title: "Selected Trip" }}
      />
    </Stack.Navigator>
  );
}
