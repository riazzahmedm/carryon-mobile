import { View, Text, StyleSheet } from "react-native";
import { useTravellerEarningSummary } from "../hooks/useTravellerEarningSummary";
import { colors, spacing, typography } from "../theme";

export function TravellerEarningsCard() {
  const { data, isLoading } = useTravellerEarningSummary();

  if (isLoading || !data) return null;

  const total = data.pending + data.completed;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your earnings</Text>
        <Text style={styles.total}>₹{total}</Text>
        <Text style={styles.subtitle}>Total earned</Text>
      </View>

      {/* Breakdown */}
      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Pending</Text>
          <Text style={styles.pending}>₹{data.pending}</Text>
          <Text style={styles.helper}>After delivery</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.column}>
          <Text style={styles.label}>Completed</Text>
          <Text style={styles.completed}>₹{data.completed}</Text>
          <Text style={styles.helper}>Paid out</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  header: {
    alignItems: "center",
    marginBottom: spacing.md,
  },

  title: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  total: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  column: {
    flex: 1,
    alignItems: "center",
  },

  separator: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
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

  helper: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
