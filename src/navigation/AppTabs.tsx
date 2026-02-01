import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Pressable, StyleSheet } from "react-native";
import { Home, Map, Truck, User } from "lucide-react-native";

import HomeStack from "./HomeStack";
import TripsStack from "./TripsStack";
import DeliveriesStack from "./DeliveriesStack";
import ProfileStack from "./ProfileStack";
import { FloatingTabBar } from "../components/FloatingTabBar";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="TripsTab" component={TripsStack} />
      <Tab.Screen name="DeliveriesTab" component={DeliveriesStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  );
}

