import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { spacing } from "../theme";

export function Screen({ children }: { children: React.ReactNode }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
});
