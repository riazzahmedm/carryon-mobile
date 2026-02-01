import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import CreateDeliveryScreen from "../screens/deliveries/CreateDeliveryScreen";
import CreateTripScreen from "../screens/trips/CreateTripScreen";
import SearchTripsScreen from "../screens/trips/SearchTripsScreen";
import PricingScreen from "../screens/pricing/PricingScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateDelivery"
        component={CreateDeliveryScreen}
        options={{ title: "Send an item" }}
      />

      <Stack.Screen
        name="SearchTrips"
        component={SearchTripsScreen}
        options={{ title: "Search trips" }}
      />

      <Stack.Screen
        name="Pricing"
        component={PricingScreen}
        options={{ title: "Pricing quote" }}
      />

      <Stack.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={{ title: "Carry & earn" }}
      />
    </Stack.Navigator>
  );
}

