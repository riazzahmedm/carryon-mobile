import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../theme";

export function DeliveryCard({ delivery, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.title}>{delivery.itemName}</Text>

      <Text style={styles.meta}>
        {delivery.weightKg} kg • ₹{delivery.declaredValue}
      </Text>

      <Text style={styles.status}>
        Status:{" "}
        <Text style={{ fontWeight: "600" }}>
          {delivery.status}
        </Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  status: {
    marginTop: spacing.sm,
    ...typography.caption,
  },
});
