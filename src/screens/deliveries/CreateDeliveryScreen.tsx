import { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { createDelivery } from "../../api/deliveries";
import { colors, spacing, typography } from "../../theme";

export default function CreateDeliveryScreen({ navigation }: any) {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [declaredValue, setDeclaredValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!itemName || !itemCategory || !weightKg || !declaredValue) {
      setError("All fields are required");
      return;
    }

    if (Number(weightKg) <= 0) {
      setError("Weight must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const delivery = await createDelivery({
        itemName: itemName.trim(),
        itemCategory: itemCategory.trim(),
        weightKg: Number(weightKg),
        declaredValue: Number(declaredValue),
      });

      navigation.navigate("SearchTrips", {
        deliveryId: delivery.id,
      });
    } catch (e) {
      setError("Failed to create delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Send an item</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Item name</Text>
      <Input
        value={itemName}
        onChangeText={setItemName}
        placeholder="e.g. Documents"
      />

      <Text style={styles.label}>Category</Text>
      <Input
        value={itemCategory}
        onChangeText={setItemCategory}
        placeholder="Documents / Electronics"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <Input
        value={weightKg}
        onChangeText={setWeightKg}
        placeholder="1.5"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Declared value (₹)</Text>
      <Input
        value={declaredValue}
        onChangeText={setDeclaredValue}
        placeholder="3000"
        keyboardType="numeric"
      />

      <Button
        title="Find travellers"
        onPress={submit}
        loading={loading}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    marginBottom: spacing.lg,
  },

  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },

  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
    ...typography.body,
  },
});
