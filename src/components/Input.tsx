import { TextInput, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";
import { useState } from "react";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  maxLength?: number;
  noBorder?: boolean;
};

export function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  maxLength,
  noBorder = false,
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      maxLength={maxLength}
      style={[
        styles.input,
        noBorder && styles.noBorder,
        focused && !noBorder && styles.focused,
      ]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={colors.textSecondary}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    backgroundColor: colors.white,
    flex: 1,
  },

  focused: {
    borderColor: colors.primary,
  },

  noBorder: {
    borderWidth: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 0,
  },
});

