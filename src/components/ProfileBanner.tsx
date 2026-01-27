import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme";

type Props = {
  onPress: () => void;
};

export default function ProfileBanner({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete your profile</Text>

      <Text style={styles.description}>
        Completing your profile builds trust and helps faster matching.
      </Text>

      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.link}>Complete profile →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8E1", // soft yellow
    borderWidth: 1,
    borderColor: "#FFE082",
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  description: {
    ...typography.caption,
    marginBottom: spacing.md,
  },
  link: {
    color: colors.primary,
    fontWeight: "600",
  },
});
