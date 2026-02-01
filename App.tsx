import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/store/queryClient";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/auth/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, StatusBar, View } from "react-native";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreenExpo from "expo-splash-screen";
import SplashScreen from "./src/screens/SplashScreen";
import { toastConfig } from "./src/utils/toast.config";

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
  });

  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreenExpo.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (showLottie) {
    return <SplashScreen onFinish={() => setShowLottie(false)} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar translucent={false} />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}
