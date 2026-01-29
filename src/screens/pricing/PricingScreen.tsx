import { useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors, spacing, typography } from "../../theme";
import { getPricingQuote } from "../../api/pricing";
import { matchDelivery } from "../../api/deliveries";
import { showError, showSuccess } from "../../utils/toast";
import { Row } from "../../components/Row";
import { useQueryClient } from "@tanstack/react-query";

export default function PricingScreen({ route, navigation }: any) {
  const { deliveryId, tripId } = route.params;

  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const loadQuote = async () => {
      try {
        const q = await getPricingQuote(deliveryId, tripId);
        setQuote(q);
      } catch (e) {
        showError("Unable to calculate pricing");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadQuote();
  }, []);

  const confirm = async () => {
    try {
      setConfirming(true);
      await matchDelivery(deliveryId, tripId);
      queryClient.invalidateQueries({ queryKey: ["myDeliveries"] });
      showSuccess("Delivery matched successfully");
      navigation.navigate("Home");
    } catch {
      showError("Failed to confirm delivery");
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>Confirm pricing</Text>

      {/* Pricing breakdown */}
      <Text style={styles.section}>Price breakdown</Text>

      <Row label="Base price" value={`₹${quote.base}`} />
      <Row label="Weight cost" value={`₹${quote.weightCost}`} />
      <Row label="Platform fee" value={`₹${quote.platformFee}`} />

      <Text style={styles.total}>
        Total payable: ₹{quote.total}
      </Text>

      {/* Risk warning */}
      {quote.risk !== "LOW" && (
        <Text style={styles.warning}>
          ⚠️ This delivery requires additional verification
        </Text>
      )}

      <Button
        title={`Confirm & proceed ₹${quote.total}`}
        onPress={confirm}
        loading={confirming}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    marginBottom: spacing.lg,
  },

  section: {
    ...typography.caption,
    marginBottom: spacing.md,
    color: colors.textSecondary,
  },

  total: {
    marginTop: spacing.lg,
    fontSize: 22,
    fontWeight: "700",
  },

  warning: {
    marginVertical: spacing.md,
    color: colors.warning,
  },
});
