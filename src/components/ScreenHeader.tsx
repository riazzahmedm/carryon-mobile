import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { colors, spacing, typography } from "../theme";

type Props = {
  title: string;
  onBack?: () => void;
};

export function ScreenHeader({ title, onBack }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <ArrowLeft size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
    backgroundColor: colors.muted, // subtle touch
  },

  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
});
