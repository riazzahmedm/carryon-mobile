import { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { requestOtp } from "../api/auth";
import { showError, showSuccess } from "../utils/toast";

import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme";

export default function PhoneScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (phone.length !== 10) {
      showError("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      await requestOtp(phone);
      showSuccess("OTP sent successfully");
      navigation.navigate("Otp", { phone });
    } catch (e: any) {
      showError(e.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Enter your phone</Text>

      <Input
        value={phone}
        onChangeText={setPhone}
        placeholder="9999999999"
        keyboardType="phone-pad"
        maxLength={10}
      />

      <Button
        title="Continue"
        onPress={submit}
        loading={loading}
        disabled={loading}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
});
