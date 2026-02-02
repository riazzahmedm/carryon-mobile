import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { useMe } from "../../hooks/useMe";
import ProfileBanner from "../../components/ProfileBanner";

import { Screen } from "../../components/Screen";
import { colors, spacing, typography } from "../../theme";
import { ChevronRight, Package, Plane } from "lucide-react-native";

export default function HomeScreen({ navigation }: any) {
  const { data, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <Text style={styles.error}>Unable to load your profile.</Text>
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
        Hi {data.fullName || "there"}
      </Text>
      <Text style={styles.subtitle}>
        What would you like to do today?
      </Text>

      {/* Actions */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("CreateDelivery")}
        activeOpacity={0.85}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconWrap}>
            <Package size={22} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>Send an item</Text>
          <ChevronRight size={18} color={colors.textMuted} />
        </View>
        <Text style={styles.cardSubtitle}>
          Find travellers going your way
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("CreateTrip")}
        activeOpacity={0.85}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconWrap}>
            <Plane size={22} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>Carry & earn</Text>
          <ChevronRight size={18} color={colors.textMuted} />
        </View>
        <Text style={styles.cardSubtitle}>
          Earn by carrying items while you travel
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },

  cardTitle: {
    ...typography.title,
    marginBottom: spacing.xs,
  },

  cardSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },

  error: {
    ...typography.body,
    color: colors.danger,
    textAlign: "center",
    marginTop: spacing.lg,
  },
});

