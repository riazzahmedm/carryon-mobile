import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../auth/AuthContext";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return token ? <AppNavigator /> : <AuthNavigator />;
}
