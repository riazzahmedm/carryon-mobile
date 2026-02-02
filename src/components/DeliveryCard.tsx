import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../theme";
import { DEL_STATUS_COLORS, DeliveryStatus } from "../utils/common";

export function DeliveryCard({ delivery, onPress }: any) {
  const statusColor =
    DEL_STATUS_COLORS[delivery.status as DeliveryStatus];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Top row: route + status */}
      <View style={styles.topRow}>
        <Text style={styles.route}>
          {delivery.fromCity} → {delivery.toCity}
        </Text>

        <View
          style={[
            styles.statusChip,
            { backgroundColor: statusColor + "20" },
          ]}
        >
          <Text style={[styles.statusText, { color: statusColor }]}>
            {delivery.status}
          </Text>
        </View>
      </View>

      {/* Item */}
      <Text style={styles.title}>{delivery.itemName}</Text>

      {/* Meta */}
      <Text style={styles.meta}>
        {delivery.weightKg} kg • ₹{delivery.declaredValue} •{" "}
        {delivery.travelDate.split("T")[0]}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  route: {
    ...typography.title,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  statusChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    ...typography.caption,
    fontWeight: "600",
  },

  title: {
    ...typography.body,
    marginBottom: spacing.xs,
  },

  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
