import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneScreen from "../auth/PhoneScreen";
import OtpScreen from "../auth/OtpScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
}
