import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { colors, spacing, typography } from "../theme";
import { useRef } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
};

export function OtpInput({ value, onChange, length = 6 }: Props) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        {Array.from({ length }).map((_, index) => {
          const digit = value[index] || "";
          const isFocused = index === value.length;

          return (
            <View
              key={index}
              style={[
                styles.box,
                isFocused && styles.activeBox,
              ]}
            >
              <Text style={styles.digit}>{digit}</Text>
            </View>
          );
        })}
      </View>

      {/* Hidden real input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus
        style={styles.hiddenInput}
      />
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing.xl,
  },

  box: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },

  activeBox: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },

  digit: {
    ...typography.h3,
    color: colors.textPrimary,
  },

  hiddenInput: {
    position: "absolute",
    opacity: 0,
  },
});
