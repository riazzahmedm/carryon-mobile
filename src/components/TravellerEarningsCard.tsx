import { View, Text, StyleSheet } from "react-native";
import { useTravellerEarningSummary } from "../hooks/useTravellerEarningSummary";
import { colors, spacing, typography } from "../theme";

export function TravellerEarningsCard() {
  const { data, isLoading } = useTravellerEarningSummary();
  if (isLoading || !data) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your earnings</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Pending</Text>
          <Text style={styles.pending}>₹{data.pending}</Text>
        </View>

        <View>
          <Text style={styles.label}>Completed</Text>
          <Text style={styles.completed}>₹{data.completed}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  title: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  pending: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F57C00", // amber
    marginTop: spacing.xs,
  },

  completed: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.success,
    marginTop: spacing.xs,
  },
});

