import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { requestOtp } from "../api/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { showError, showSuccess } from "../utils/toast";

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
    <SafeAreaView edges={["top"]} className="flex-1 justify-center p-6">
      <Text className="text-2xl font-bold mb-4">Enter your phone</Text>

      <TextInput
        className="border rounded p-3 mb-4"
        keyboardType="phone-pad"
        placeholder="9999999999"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity onPress={submit} className="bg-black p-4 rounded">
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
        <Text className="text-white text-center font-bold">Continue</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
