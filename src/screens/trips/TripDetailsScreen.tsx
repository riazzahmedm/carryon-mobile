import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors, spacing, typography } from "../../theme";
import { useDeliveryActions } from "../../hooks/useDeliveryActions";
import { toast } from "../../utils/toast";
import { ScreenHeader } from "../../components/ScreenHeader";

export default function TripDetailsScreen({ route, navigation }: any) {
  const { trip } = route.params;
  const { id: tripId } = trip;

  const {
    approve,
    reject,
    pickup,
    deliver,
  } = useDeliveryActions(tripId);

  const onApprove = (deliveryId: string) => {
    approve.mutate(deliveryId, {
      onSuccess: () => {
        toast.success("Delivery approved");
        navigation.goBack();
      },
      onError: () => toast.error("Failed to approve delivery"),
    });
  };

  const onReject = (deliveryId: string) => {
    reject.mutate(deliveryId, {
      onSuccess: () => {
        toast.success("Delivery rejected");
        navigation.goBack();
      },
      onError: () => toast.error("Failed to reject delivery"),
    });
  };

  const onPickedUp = (deliveryId: string) => {
    pickup.mutate(deliveryId, {
      onSuccess: () => {
        toast.success("Delivery picked up");
        navigation.goBack();
      },
      onError: () => toast.error("Failed to pick up delivery"),
    });
  };

  const onDelivered = (deliveryId: string) => {
    deliver.mutate(deliveryId, {
      onSuccess: () => {
        toast.success("Delivered successfully");
        navigation.goBack();
      },
      onError: () => toast.error("Failed to deliver item"),
    });
  };

  return (
    <Screen>
       <ScreenHeader title="Trip Details" onBack={() => navigation.goBack()} />
      
      {/* Trip summary */}
      <View style={styles.tripCard}>
        <Text style={styles.route}>
          {trip.fromCity} → {trip.toCity}
        </Text>

        <Text style={styles.meta}>
          {new Date(trip.flightDate).toDateString()}
        </Text>

        <View style={styles.tripRow}>
          <Text style={styles.tripPill}>
            Capacity: {trip.capacityKg} kg
          </Text>

          <Text style={styles.tripStatus}>
            {trip.tripStatus.replace("_", " ")}
          </Text>
        </View>
      </View>

      {/* Deliveries */}
      <FlatList
        data={trip.deliveries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <View style={styles.deliveryCard}>
            {/* Header */}
            <View style={styles.deliveryHeader}>
              <Text style={styles.itemName}>{item.itemName}</Text>
              <Text style={styles.weight}>{item.weightKg} kg</Text>
            </View>

            <Text style={styles.sender}>
              Sender: {item?.sender?.fullName || "—"}
            </Text>

            <Text style={styles.deliveryStatus}>
              Status: {item.status.replace("_", " ")}
            </Text>

            {/* Earnings */}
            <View style={styles.earningCard}>
              <Text style={styles.earningLabel}>You’ll earn</Text>
              <Text style={styles.earningAmount}>
                ₹{item.travellerEarning}
              </Text>
              <Text style={styles.earningNote}>
                Paid after successful delivery
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              {item.status === "MATCHED" && (
                <>
                  <Button
                    title="Approve & carry"
                    onPress={() => onApprove(item.id)}
                  />
                  <Button
                    title="Reject"
                    onPress={() => onReject(item.id)}
                    transparent
                  />
                </>
              )}

              {item.status === "APPROVED" && (
                <Button
                  title="Mark as picked up"
                  onPress={() => onPickedUp(item.id)}
                />
              )}

              {item.status === "PICKED_UP" && (
                <Button
                  title="Mark delivered"
                  onPress={() => onDelivered(item.id)}
                />
              )}
            </View>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  /* Trip summary */
  tripCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  route: {
    ...typography.title,
    marginBottom: spacing.xs,
  },

  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  tripRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },

  tripPill: {
    backgroundColor: colors.muted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    fontWeight: "600",
  },

  tripStatus: {
    fontWeight: "600",
    color: colors.primary,
  },

  /* Delivery card */
  deliveryCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  deliveryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  itemName: {
    ...typography.body,
    fontWeight: "600",
  },

  weight: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  sender: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },

  deliveryStatus: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  /* Earnings */
  earningCard: {
    backgroundColor: "#F1F8F4",
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },

  earningLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },

  earningAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.success,
    marginBottom: spacing.xs,
  },

  earningNote: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  /* Actions */
  actions: {
    gap: spacing.sm,
  },
});
