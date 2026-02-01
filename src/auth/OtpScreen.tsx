import { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { verifyOtp, requestOtp } from "../api/auth";
import { useAuth } from "./AuthContext";

import { Screen } from "../components/Screen";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme";
import { toast } from "../utils/toast";
import { OtpInput } from "../components/OtpInput";
import { ArrowLeft } from "lucide-react-native";

export default function OtpScreen({ route, navigation }: any) {
  const { phone } = route.params;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const { signIn } = useAuth();

  useEffect(() => {
    if (timer === 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const submit = async () => {
    if (otp.length !== 6) {
      toast.error("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtp(phone, otp);
      await signIn(res.accessToken);
      toast.success("Logged in successfully");
    } catch (e: any) {
      toast.error("The code you entered is incorrect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      await requestOtp(phone);
      setTimer(30);
      toast.success("OTP resent");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={10}
        >
          <ArrowLeft size={22} color={colors.textPrimary} />
          <Text style={styles.backText}>Change number</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the code sent to +91 •••• {phone.slice(-4)}
      </Text>

      <OtpInput value={otp} onChange={setOtp} />

      <Button
        title="Verify"
        onPress={submit}
        loading={loading}
        disabled={loading}
        style={{ marginTop: spacing.lg }}
      />

      <View style={styles.resendContainer}>
        {timer > 0 ? (
          <Text style={styles.resendText}>Resend OTP in {timer}s</Text>
        ) : (
          <Button
            title="Resend OTP"
            variant="ghost"
            onPress={resend}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
   header: {
    marginBottom: spacing.lg,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
   backText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  resendContainer: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  resendText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
