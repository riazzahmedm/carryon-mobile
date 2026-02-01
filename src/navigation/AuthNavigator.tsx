import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneScreen from "../auth/PhoneScreen";
import OtpScreen from "../auth/OtpScreen";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right", // native & smooth
      }}
    >
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="PhoneAuthScreen"
        component={PhoneScreen}
      />
      <Stack.Screen
        name="OtpAuthScreen"
        component={OtpScreen}
      />
    </Stack.Navigator>
  );
}
