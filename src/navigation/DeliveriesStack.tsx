import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchTripsScreen from "../screens/trips/SearchTripsScreen";
import PricingScreen from "../screens/pricing/PricingScreen";
import MyDeliveriesScreen from "../screens/deliveries/MyDeliveriesScreen";

const Stack = createNativeStackNavigator();

export default function DeliveriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyDeliveries"
        component={MyDeliveriesScreen}
        options={{ title: "My Deliveries" }}
      />
      <Stack.Screen
        name="SearchTrips"
        component={SearchTripsScreen}
      />
      <Stack.Screen
        name="Pricing"
        component={PricingScreen}
      />
    </Stack.Navigator>
  );
}
