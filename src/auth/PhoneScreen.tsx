import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { requestOtp } from "../api/auth";

import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { colors, spacing, typography } from "../theme";
import { toast } from "../utils/toast";

export default function PhoneScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      await requestOtp(phone);
      toast.success("We’ve sent a verification code to your number.");
      navigation.navigate("OtpAuthScreen", { phone });
    } catch (e: any) {
     toast.error("Unable to send the code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Let’s get you verified!</Text>
        <Text style={styles.subtitle}>
          Enter your phone number to continue. We’ll send you a one-time verification code.
        </Text>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.countryCode}>+91</Text>
        <Input
          value={phone}
          onChangeText={setPhone}
          placeholder="99999 99999"
          keyboardType="phone-pad"
          maxLength={10}
          noBorder
        />
      </View>

      <Button
        title="Continue"
        onPress={submit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      />

      <Text style={styles.footerText}>
        By continuing, you agree to our Terms & Privacy Policy
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  countryCode: {
    fontSize: 18,
    marginRight: spacing.sm,
    color: colors.textPrimary,
  },
  button: {
    marginTop: spacing.md,
  },
  footerText: {
    marginTop: spacing.lg,
    textAlign: "center",
    fontSize: 12,
    color: colors.textSecondary,
  },
});
