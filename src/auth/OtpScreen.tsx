import { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { verifyOtp } from "../api/auth";
import { useAuth } from "./AuthContext";
import { showError, showSuccess } from "../utils/toast";

import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme";

export default function OtpScreen({ route }: any) {
  const { phone } = route.params;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const submit = async () => {
    if (otp.length !== 6) {
      showError("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp(phone, otp);
      await signIn(res.accessToken);
      showSuccess("Logged in successfully");
    } catch (e: any) {
      showError(e.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Sent to {phone}</Text>

      <Input
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
      />

      <Button
        title="Verify"
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
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.caption,
    marginBottom: spacing.lg,
  },
});
