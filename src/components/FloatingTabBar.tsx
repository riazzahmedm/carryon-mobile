import {
  View,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Home, Package, PlaneTakeoff, User } from "lucide-react-native";
import { colors } from "../theme";
import { useEffect, useRef } from "react";

const TAB_COUNT = 4;

export function FloatingTabBar({ state, navigation }: any) {
   const icons: Record<string, any> = {
    HomeTab: Home,
    TripsTab: PlaneTakeoff,
    DeliveriesTab: Package,
    ProfileTab: User,
  };

  // ✅ Create animated values ONCE
  const animatedValues = useRef(
    Array.from({ length: TAB_COUNT }, () => new Animated.Value(0))
  ).current;

  // ✅ Animate on focus change
  useEffect(() => {
    animatedValues.forEach((val, index) => {
      Animated.timing(val, {
        toValue: state.index === index ? 1 : 0,
        duration: 260,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
          const focused = state.index === index;
          const Icon = icons[route.name];
          if (!Icon) return null;
          const animatedStyle = {
            opacity: animatedValues[index],
            transform: [
              {
                scale: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.92, 1],
                }),
              },
            ],
          };

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
            >
              <Animated.View
                style={[styles.activeLayer, animatedStyle]}
              />
              <Icon
                size={22}
                color={focused ? colors.white : colors.textSecondary}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 32,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  tab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  activeLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    borderRadius: 26,
  },
});
