import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";
import { colors, spacing, typography } from "../../theme";


export function OnboardingItem({ item }: any) {
  return (
    <Animated.View
      entering={FadeInRight.duration(400)}
      exiting={FadeOutLeft.duration(300)}
      style={styles.container}
    >
      {/* <LottieView
        source={item.animation}
        autoPlay
        loop
        style={styles.animation}
      /> */}

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {item.points.map((point: string) => (
        <Text key={point} style={styles.point}>
          • {point}
        </Text>
      ))}

     
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "center",
    //backgroundColor: colors.primary,
  },
  animation: {
    width: 260,
    height: 260,
    alignSelf: "center",
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  point: {
    ...typography.body,
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
});
