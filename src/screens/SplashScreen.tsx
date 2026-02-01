import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../theme";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/lottie/logo.json")}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "100%",
    height: "100%"
  },
});
