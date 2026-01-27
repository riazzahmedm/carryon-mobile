import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { verifyOtp } from "../api/auth";
import { useAuth } from "./AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpScreen({ route }: any) {
  const { phone } = route.params;
  const [otp, setOtp] = useState("");
  const { signIn } = useAuth();

  const submit = async () => {
    const res = await verifyOtp(phone, otp);
    await signIn(res.accessToken);
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
        <Text className="text-white text-center font-bold">Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
