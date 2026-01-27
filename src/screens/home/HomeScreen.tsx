import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useMe } from "../../hooks/useMe";
import ProfileBanner from "../../components/ProfileBanner";

import { Screen } from "../../components/Screen";
import { colors, spacing, typography } from "../../theme";

export default function HomeScreen({ navigation }: any) {
  const { data, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <Text style={styles.error}>Failed to load user</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Profile completion banner */}
      {!data.profileDone && (
        <ProfileBanner
          onPress={() => navigation.navigate("ProfileTab")}
        />
      )}

      {/* Greeting */}
      <Text style={styles.greeting}>
        Hi {data.fullName || "there"} 👋
      </Text>
      <Text style={styles.subtitle}>
        What would you like to do today?
      </Text>

      {/* Send Item */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("CreateDelivery")}
        activeOpacity={0.8}
      >
        <Text style={styles.cardTitle}>📦 Send an item</Text>
        <Text style={styles.cardSubtitle}>
          Find travellers going your way
        </Text>
      </TouchableOpacity>

      {/* Carry & Earn */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("CreateTrip")}
        activeOpacity={0.8}
      >
        <Text style={styles.cardTitle}>✈️ Carry & earn</Text>
        <Text style={styles.cardSubtitle}>
          Earn by carrying items while you travel
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.caption,
    marginBottom: spacing.xl,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.caption,
  },
  error: {
    color: colors.danger,
    ...typography.body,
  },
});
