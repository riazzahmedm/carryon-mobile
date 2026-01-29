import { useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { createTrip } from "../../api/trips";
import { colors, spacing, typography } from "../../theme";
import { showError, showSuccess } from "../../utils/toast";

export default function CreateTripScreen({ navigation }: any) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [capacityKg, setCapacityKg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!fromCity || !toCity || !flightDate || !capacityKg) {
      showError("All fields are required");
      return;
    }

    if (Number(capacityKg) <= 0) {
      showError("Capacity must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      await createTrip({
        fromCity: fromCity.trim(),
        toCity: toCity.trim(),
        flightDate,
        capacityKg: Number(capacityKg),
      });

      showSuccess("Trip created");
      navigation.goBack();
    } catch (e) {
      showError("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Add a trip</Text>

      <ScrollView>
        <Text style={styles.label}>From city</Text>
        <Input
          value={fromCity}
          onChangeText={setFromCity}
          placeholder="HYD"
        />

        <Text style={styles.label}>To city</Text>
        <Input
          value={toCity}
          onChangeText={setToCity}
          placeholder="BLR"
        />

        <Text style={styles.label}>Flight date (YYYY-MM-DD)</Text>
        <Input
          value={flightDate}
          onChangeText={setFlightDate}
          placeholder="2026-02-01"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Available capacity (kg)</Text>
        <Input
          value={capacityKg}
          onChangeText={setCapacityKg}
          placeholder="5"
          keyboardType="numeric"
        />

        <Button
          title="Create trip"
          onPress={submit}
          loading={loading}
        />
      </ScrollView>
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
});
