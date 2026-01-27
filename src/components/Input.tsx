import { TextInput, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  maxLength?: number;
};

export function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  maxLength,
}: Props) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: 18,
    textAlign: "center",
  },
});
