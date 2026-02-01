import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToast } from "react-native-toast-message";
import { colors, spacing, typography } from "../theme";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.success]}
      contentContainerStyle={styles.content}
      text1Style={styles.text}
    />
  ),

  error: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.error]}
      contentContainerStyle={styles.content}
      text1Style={styles.text}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.info]}
      contentContainerStyle={styles.content}
      text1Style={styles.text}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    borderLeftWidth: 0,
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  content: {
    paddingHorizontal: 0,
  },

  text: {
    ...typography.body,
    color: colors.white,
  },

  success: {
    backgroundColor: colors.success,
  },

  error: {
    backgroundColor: colors.error,
  },

  info: {
    backgroundColor: colors.primary,
  },
});
