import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../theme";
import { Trip } from "../api/trips";
import { STATUS_COLORS } from "../utils/common";
import { Package, Plane } from "lucide-react-native";

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {trip?.user?.fullName || "Traveller"}
        </Text>

        <View
          style={[
            styles.statusPill,
            { backgroundColor: STATUS_COLORS[trip.tripStatus] + "20" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: STATUS_COLORS[trip.tripStatus] },
            ]}
          >
            {trip?.tripStatus?.replace("_", " ")}
          </Text>
        </View>
      </View>

      {/* Route */}
      <Text style={styles.route}>
        {trip.fromCity} → {trip.toCity}
      </Text>

      {/* Meta */}
      <View style={styles.metaRow}>
        <View style={styles.metaView}>
          <View style={styles.iconWrap}>
            <Plane size={22} color={colors.primary} />
          </View>
          <Text style={styles.meta}>
            {new Date(trip.flightDate).toLocaleDateString()}
          </Text>
        </View>

         <View style={styles.metaView}>
          <View style={styles.iconWrap}>
            <Package size={22} color={colors.primary} />
          </View>
          <Text style={styles.meta}>
            {trip.capacityKg} kg capacity
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginHorizontal: spacing.md
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  name: {
    ...typography.body,
    fontWeight: "600",
  },

  route: {
    ...typography.h2,
    marginVertical: spacing.xs,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },

  metaView: {
    alignItems: 'center'
  },

  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  statusPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
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
});
