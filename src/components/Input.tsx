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
      placeholderTextColor={colors.textSecondary}
      autoFocus
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
  },
});
