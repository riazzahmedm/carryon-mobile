import { useState } from "react";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Screen } from "../../components/Screen";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { createDelivery } from "../../api/deliveries";
import { colors, spacing, typography } from "../../theme";
import { useDeliveryCategories } from "../../hooks/useDeliveryCategories";
import { CategoryModal } from "../../components/CategoryModal";
import { showError } from "../../utils/toast";
import { useRef } from "react";

export default function CreateDeliveryScreen({ navigation }: any) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState<{
    id: string;
    label: string;
  } | null>(null);
  const [weightKg, setWeightKg] = useState("");
  const [declaredValue, setDeclaredValue] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { data: categories = [] } = useDeliveryCategories();
  const isSubmittingRef = useRef(false);

  const submit = async () => {
    if (isSubmittingRef.current) return;
    if (!itemName || !weightKg || !declaredValue || !fromCity || !toCity || !travelDate) {
      showError("All fields are required");
      return;
    }

    if (!category) {
      showError("Please select a category");
      return;
    }

    if (Number(weightKg) <= 0) {
      showError("Weight must be greater than 0");
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
        fromCity: fromCity.trim(),
        toCity: toCity.trim(),
        travelDate: travelDate,
      });
      navigation.replace("SearchTrips", {
        deliveryId: delivery.id,
        fromCity: fromCity.trim(),
        toCity: toCity.trim(),
        date: travelDate,
      });
    } catch (e) {
      isSubmittingRef.current = false;
      showError("Failed to create delivery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Send an item</Text>
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

        <Text style={styles.label}>Travel date (YYYY-MM-DD)</Text>
        <Input
          value={travelDate}
          onChangeText={setTravelDate}
          placeholder="2026-02-01"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Item name</Text>
        <Input
          value={itemName}
          onChangeText={setItemName}
          placeholder="Documents"
        />

        <Text style={styles.label}>Category</Text>
        <TouchableOpacity
          style={styles.categoryField}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text
            style={{
              color: category ? colors.textPrimary : colors.textSecondary,
            }}
          >
            {category ? category.label : "Select category"}
          </Text>
        </TouchableOpacity>

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

        <CategoryModal
          visible={showCategoryModal}
          categories={categories}
          onSelect={(cat) => setCategory(cat)}
          onClose={() => setShowCategoryModal(false)}
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

  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
    ...typography.body,
  },

  categoryField: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
});
