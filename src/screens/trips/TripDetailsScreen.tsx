import {
  Text,
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
} from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors, spacing, typography } from "../../theme";
import { useDeliveryActions } from "../../hooks/useDeliveryActions";
import { showError, showSuccess } from "../../utils/toast";

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
        showSuccess("Delivery approved");
        navigation.goBack();
      },
      onError: () => showError("Failed to approve delivery"),
    });
  };

  const onReject = (deliveryId: string) => {
    reject.mutate(deliveryId, {
      onSuccess: () => {
        showSuccess("Delivery rejected");
        navigation.goBack();
      },
      onError: () => showError("Failed to reject delivery"),
    });
  };

  const onPickedUp = (deliveryId: string) => {
    pickup.mutate(deliveryId, {
      onSuccess: () => {
        showSuccess("Delivery picked up");
        navigation.goBack();
      },
      onError: () => showError("Failed to pick up delivery"),
    });
  };

  const onDelivered = (deliveryId: string) => {
    deliver.mutate(deliveryId, {
      onSuccess: () => {
        showSuccess("Delivered successfully");
        navigation.goBack();
      },
      onError: () => showError("Failed to deliver item"),
    });
  };

  return (
    <Screen>
      {/* TRIP SUMMARY */}
      <View style={styles.tripHeader}>
        <Text style={styles.route}>
          {trip.fromCity} → {trip.toCity}
        </Text>
        <Text style={styles.meta}>
          {new Date(trip.flightDate).toDateString()}
        </Text>
        <Text style={styles.meta}>Available space: {trip.capacityKg} KG</Text>
        <Text style={styles.status}>
          Status: {trip.tripStatus.replace("_", " ")}
        </Text>
      </View>

      {/* DELIVERIES */}

      <FlatList
        data={trip.deliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.itemName}</Text>
            <Text style={styles.itemName}>{item.weightKg} KG</Text>
            <Text>Sender: {item?.sender?.fullName}</Text>
            <Text>Status: {item.status}</Text>

            <View style={styles.earningCard}>
              <Text style={styles.earningLabel}>You will earn</Text>
              <Text style={styles.earningAmount}>₹{item.travellerEarning}</Text>
              <Text style={styles.earningNote}>
                Paid after successful delivery
              </Text>
            </View>

            {item.status === "MATCHED" && (
              <>
                <Button
                  title="Approve & Carry"
                  onPress={() => onApprove(item.id)}
                />
                <Button
                  title="Reject"
                  onPress={() => onReject(item.id)}
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
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tripHeader: {
    marginBottom: spacing.lg,
  },

  route: {
    ...typography.title,
  },

  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  status: {
    marginTop: spacing.xs,
    fontWeight: "600",
  },

  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  itemName: {
    fontWeight: "600",
    marginBottom: spacing.xs,
  },

  earningCard: {
    backgroundColor: "#F1F8F4",
    borderRadius: 16,
    padding: spacing.lg,
    marginVertical: spacing.lg,
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
});
