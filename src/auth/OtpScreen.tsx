import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { verifyOtp } from "../api/auth";
import { useAuth } from "./AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { showError, showSuccess } from "../utils/toast";

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
    <SafeAreaView className="flex-1 justify-center p-6">
      <Text className="text-xl font-bold mb-2">Verify OTP</Text>
      <Text className="mb-4">Sent to {phone}</Text>

      <TextInput
        className="border rounded p-3 mb-4 text-center text-lg"
        keyboardType="number-pad"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity onPress={submit} className="bg-black p-4 rounded">
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
        <Text className="text-white text-center font-bold">Verify</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
