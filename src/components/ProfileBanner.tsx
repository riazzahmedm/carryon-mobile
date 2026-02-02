import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme";
import { UserCheck, ChevronRight } from "lucide-react-native";

type Props = {
  onPress: () => void;
};

export default function ProfileBanner({ onPress }: Props) {
  return (
    <View style={styles.wrapper}>
      {/* Accent strip */}
      <View style={styles.accent} />

      <View style={styles.container}>
        <View style={styles.header}>
          <UserCheck size={20} color={colors.primary} />
          <Text style={styles.title}>Complete your profile</Text>
        </View>

        <Text style={styles.description}>
          Completing your profile builds trust and helps faster matching.
        </Text>

        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.75}
          style={styles.cta}
        >
          <Text style={styles.link}>Complete profile</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: spacing.lg,
    overflow: "hidden",
  },

  accent: {
    width: 4,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    padding: spacing.lg,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },

  title: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  description: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  cta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
  },

  link: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: "600",
  },
});
