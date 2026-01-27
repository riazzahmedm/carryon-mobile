import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { requestOtp } from "../api/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhoneScreen({ navigation }: any) {
  const [phone, setPhone] = useState("");

  const submit = async () => {
    await requestOtp(phone);
    navigation.navigate("Otp", { phone });
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
        <Text className="text-white text-center font-bold">Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
