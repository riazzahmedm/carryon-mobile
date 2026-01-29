import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import DeliveriesStack from "./DeliveriesStack";
import TripsStack from "./TripsStack";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ headerShown: false, title: "Home" }}
      />
      <Tab.Screen
        name="TripsTab"
        component={TripsStack}
        options={{ headerShown: false, title: "Trips" }}
      />
      <Tab.Screen
        name="DeliveriesTab"
        component={DeliveriesStack}
        options={{ headerShown: false, title: "Deliveries" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ headerShown: false, title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
