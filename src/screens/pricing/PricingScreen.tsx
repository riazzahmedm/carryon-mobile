import { useEffect, useState } from "react";
import { Text, StyleSheet, ActivityIndicator, View, TouchableOpacity } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { colors, spacing, typography } from "../../theme";
import { getPricingQuote } from "../../api/pricing";
import { matchDelivery } from "../../api/deliveries";
import { Row } from "../../components/Row";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "../../utils/toast";
import { ScreenHeader } from "../../components/ScreenHeader";

export default function PricingScreen({ route, navigation }: any) {
  const { deliveryId, tripId } = route.params;

  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      try {
        const q = await getPricingQuote(deliveryId, tripId);
        console.log(q);

        setQuote(q);
      } catch {
        toast.error("Unable to calculate pricing");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const confirm = async () => {
    try {
      setConfirming(true);
      await matchDelivery(deliveryId, tripId);
      queryClient.invalidateQueries({ queryKey: ["myDeliveries"] });
      toast.success("Delivery matched successfully");
      navigation.popToTop();
    } catch {
      toast.error("Failed to confirm delivery");
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <Screen>
        <ActivityIndicator style={{ marginTop: 40 }} />
      </Screen>
    );
  }

  return (
    <Screen scroll>
      {/* Header */}
      <ScreenHeader title="Confirm pricing" onBack={() => navigation.goBack()} />
      <Text style={styles.subtitle}>
        Review the cost before proceeding
      </Text>

      {/* Pricing card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Price breakdown</Text>

        <Row label="Base price" value={`₹${quote.breakdown.base}`} />
        <Row label="Weight cost" value={`₹${quote.breakdown.weightCost}`} />

        {quote.breakdown.distanceFee > 0 && (
          <Row label="Distance fee" value={`₹${quote.breakdown.distanceFee}`} />
        )}

        {quote.breakdown.urgencyFee > 0 && (
          <Row label="Urgency fee" value={`₹${quote.breakdown.urgencyFee}`} />
        )}

        {quote.breakdown.riskFee > 0 && (
          <Row label="Risk surcharge" value={`₹${quote.breakdown.riskFee}`} />
        )}

         <Row
          label="Platform fee"
          value={`₹${quote.platformFee}`}
        />
        
        <View style={styles.divider} />

        <Row
          label="Total payable"
          value={`₹${quote.total}`}
        />

        <TouchableOpacity
          onPress={() => setShowWhy((v) => !v)}
          activeOpacity={0.7}
          style={styles.whyToggle}
        >
          <Text style={styles.whyText}>
            Why this price?
          </Text>
          <Text style={styles.whyArrow}>
            {showWhy ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showWhy && (
          <View style={styles.whyBox}>
            <Text style={styles.whyItem}>
              • Base delivery fee: ₹{quote.breakdown.base}
            </Text>

            <Text style={styles.whyItem}>
              • Weight cost ({quote.breakdown.weightCost > 0 ? "item weight" : "—"}): ₹{quote.breakdown.weightCost}
            </Text>

            {quote.breakdown.distanceFee > 0 && (
              <Text style={styles.whyItem}>
                • Distance adjustment: ₹{quote.breakdown.distanceFee}
              </Text>
            )}

            {quote.breakdown.urgencyFee > 0 && (
              <Text style={styles.whyItem}>
                • Urgency (closer flight date): ₹{quote.breakdown.urgencyFee}
              </Text>
            )}

            {quote.breakdown.riskFee > 0 && (
              <Text style={styles.whyItem}>
                • Additional verification: ₹{quote.breakdown.riskFee}
              </Text>
            )}

            <Text style={styles.whyItem}>
              • Platform service fee: ₹{quote.platformFee}
            </Text>

            <Text style={styles.whyNote}>
              This ensures fair pricing for both sender and traveller.
            </Text>
          </View>
        )}


      </View>

      {/* Risk notice */}
      {/* {quote.risk !== "LOW" && (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>
            Additional verification required
          </Text>
          <Text style={styles.warningText}>
            This delivery may need extra checks for safety.
          </Text>
        </View>
      )} */}

      {/* CTA */}
      <Button
        title={`Confirm & pay ₹${quote.total}`}
        onPress={confirm}
        loading={confirming}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  cardTitle: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.md,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },

  warningBox: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: "#FFE082",
  },

  warningTitle: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: colors.warning,
  },

  warningText: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  whyToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },

  whyText: {
    ...typography.caption,
    fontWeight: "600",
    color: colors.primary,
  },

  whyArrow: {
    color: colors.primary,
    fontSize: 12,
  },

  whyBox: {
    backgroundColor: colors.muted,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.sm,
  },

  whyItem: {
    ...typography.caption,
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },

  whyNote: {
    ...typography.caption,
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
});
