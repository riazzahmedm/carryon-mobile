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
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="SearchTrips"
        component={SearchTripsScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="Pricing"
        component={PricingScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

