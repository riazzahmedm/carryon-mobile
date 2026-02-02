import { useState } from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { createDelivery } from "../../api/deliveries";
import { colors, spacing, typography } from "../../theme";
import { useDeliveryCategories } from "../../hooks/useDeliveryCategories";
import { useRef } from "react";
import { toast } from "../../utils/toast";
import { ScreenHeader } from "../../components/ScreenHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Airport, airports } from "../../utils/common";
import { SelectModal } from "../../components/SelectModal";

export default function CreateDeliveryScreen({ navigation }: any) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [weightKg, setWeightKg] = useState("");
  const [declaredValue, setDeclaredValue] = useState("");
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [toAirport, setToAirport] = useState<Airport | null>(null);

  const [showFromAirportModal, setShowFromAirportModal] = useState(false);
  const [showToAirportModal, setShowToAirportModal] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { data: categories = [] } = useDeliveryCategories();
  const isSubmittingRef = useRef(false);

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const submit = async () => {
    if (isSubmittingRef.current) return;
    if (!itemName || !weightKg || !declaredValue || !fromAirport || !toAirport || !travelDate) {
      toast.error("All fields are required");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (Number(weightKg) <= 0) {
      toast.error("Weight must be greater than 0");
      return;
    }

    try {
      isSubmittingRef.current = true;
      setLoading(true);
      const delivery = await createDelivery({
        itemName: itemName.trim(),
        itemCategory: category.id,
        weightKg: Number(weightKg),
        declaredValue: Number(declaredValue),
        fromCity: fromAirport.code,
        toCity: toAirport.code,
        travelDate: travelDate,
      });
      navigation.replace("SearchTrips", {
        deliveryId: delivery.id,
        fromCity: fromAirport.code,
        toCity: toAirport.code,
        date: travelDate,
      });
    } catch (e) {
      isSubmittingRef.current = false;
      toast.error("Failed to create delivery");
    } finally {
      setLoading(false);
    }
  };

  const airportItems = airports.map((a) => ({
    id: a.code,     // HYD
    label: a.label, // Hyderabad (HYD)
  }));

  return (
    <Screen scroll>
      {/* Header */}
      <ScreenHeader
        title="Send an item"
        onBack={() => navigation.goBack()}
      />
      <Text style={styles.subtitle}>
        Tell us about your item and journey
      </Text>

      {/* Route */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Route</Text>

        <Text style={styles.label}>From</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowFromAirportModal(true)}
        >
          <Text
            style={{
              color: fromAirport ? colors.textPrimary : colors.textSecondary,
            }}
          >
            {fromAirport?.label || "Select departure airport"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>To</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowToAirportModal(true)}
        >
          <Text
            style={{
              color: toAirport ? colors.textPrimary : colors.textSecondary,
            }}
          >
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

      </View>

      {/* Item */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Item details</Text>

        <Text style={styles.label}>Item name</Text>
        <Input value={itemName} onChangeText={setItemName} placeholder="Documents" />

        <Text style={styles.label}>Item Category</Text>

        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowCategoryModal(true)}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: category ? colors.textPrimary : colors.textSecondary,
            }}
          >
            {category?.label || "Select category"}
          </Text>
        </TouchableOpacity>


        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Weight (kg)</Text>
            <Input
              value={weightKg}
              onChangeText={setWeightKg}
              placeholder="1.5"
              keyboardType="numeric"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Value (₹)</Text>
            <Input
              value={declaredValue}
              onChangeText={setDeclaredValue}
              placeholder="3000"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* CTA */}
      <Button
        title="Find travellers"
        onPress={submit}
        loading={loading}
      />

      <SelectModal
        visible={showFromAirportModal}
        title="Select departure airport"
        items={airportItems}
        onSelect={(item) =>
          setFromAirport({ code: item.id, label: item.label })
        }
        onClose={() => setShowFromAirportModal(false)}
      />

      <SelectModal
        visible={showToAirportModal}
        title="Select destination airport"
        items={airportItems}
        onSelect={(item) =>
          setToAirport({ code: item.id, label: item.label })
        }
        onClose={() => setShowToAirportModal(false)}
      />

      <SelectModal
        visible={showCategoryModal}
        title="Select category"
        items={categories.map((c) => ({
          id: c.id,
          label: c.label,
        }))}
        onSelect={(item) =>
          setCategory({ id: item.id, label: item.label })
        }
        onClose={() => setShowCategoryModal(false)}
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
  },

  row: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
});

