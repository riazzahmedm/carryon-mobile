import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../theme";
import { Trip } from "../api/trips";
import { STATUS_COLORS } from "../utils/common";

type Props = {
  trip: Trip;
  onSelect: () => void;
};

export function TripCard({ trip, onSelect }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      <Text style={styles.name}>
        {trip?.user?.fullName || "Traveller"}
      </Text>

      <Text style={styles.route}>
        {trip?.fromCity} → {trip?.toCity}
      </Text>

      <Text style={styles.meta}>
        Flight: {new Date(trip?.flightDate).toLocaleDateString()}
      </Text>

      <Text style={styles.meta}>
        Capacity left: {trip?.capacityKg} kg
      </Text>

      <Text
        style={{
          color: STATUS_COLORS[trip?.tripStatus],
          fontWeight: "600",
          marginTop: 4,
        }}
      >
        {trip?.tripStatus?.replace("_", " ")}
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

  name: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },

  route: {
    ...typography.title,
    marginBottom: spacing.xs,
  },

  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
