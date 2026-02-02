import { useState } from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { createTrip } from "../../api/trips";
import { colors, spacing, typography } from "../../theme";
import { toast } from "../../utils/toast";
import { ScreenHeader } from "../../components/ScreenHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Airport, airports } from "../../utils/common";
import { SelectModal } from "../../components/SelectModal";

export default function CreateTripScreen({ navigation }: any) {
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [travelDate, setTravelDate] = useState("");
  const [capacityKg, setCapacityKg] = useState("");
  const [loading, setLoading] = useState(false);

  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const airportItems = airports.map((a) => ({
    id: a.code,
    label: a.label,
  }));

  const getToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };


  const formatDate = (date: Date) =>
    date.toISOString().split("T")[0];

  const submit = async () => {
    if (!fromAirport || !toAirport || !travelDate || !capacityKg) {
      toast.error("All fields are required");
      return;
    }

    if (Number(capacityKg) <= 0) {
      toast.error("Capacity must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      await createTrip({
        fromCity: fromAirport.code,
        toCity: toAirport.code,
        flightDate: travelDate,
        capacityKg: Number(capacityKg),
      });

      toast.success("Trip created successfully");
      navigation.goBack();
    } catch {
      toast.error("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <ScreenHeader title="Add a trip" onBack={() => navigation.goBack()} />

      <View style={styles.card}>
        <Text style={styles.label}>From</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowFromModal(true)}
        >
          <Text style={{ color: fromAirport ? colors.textPrimary : colors.textSecondary }}>
            {fromAirport?.label || "Select departure airport"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>To</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowToModal(true)}
        >
          <Text style={{ color: toAirport ? colors.textPrimary : colors.textSecondary }}>
            {toAirport?.label || "Select destination airport"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Travel date</Text>

        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: travelDate ? colors.textPrimary : colors.textSecondary,
            }}
          >
            {travelDate || "Select date"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={travelDate ? new Date(travelDate) : new Date()}
            mode="date"
            display="spinner" // iOS: spinner | inline | compact
            minimumDate={new Date()}
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setTravelDate(formatDate(selectedDate));
              }
            }}
          />
        )}

        <Text style={styles.label}>Available capacity (kg)</Text>
        <Input
          value={capacityKg}
          onChangeText={setCapacityKg}
          placeholder="5"
          keyboardType="numeric"
        />
      </View>

      <Button title="Create trip" onPress={submit} loading={loading} />

      {/* Modals */}
      <SelectModal
        visible={showFromModal}
        title="Select departure airport"
        items={airportItems}
        onSelect={(i) => setFromAirport({ code: i.id, label: i.label })}
        onClose={() => setShowFromModal(false)}
      />

      <SelectModal
        visible={showToModal}
        title="Select destination airport"
        items={airportItems}
        onSelect={(i) => setToAirport({ code: i.id, label: i.label })}
        onClose={() => setShowToModal(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  select: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.muted,
    marginBottom: spacing.sm,
  },
});
