import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { onboardingData } from "./data";
import { OnboardingItem } from "./OnboardingItem";
import { Button } from "../../components/Button";
import { colors } from "../../theme";
import { OnboardingPagination } from "./OnboardingPagination";
import { Package, PlaneTakeoff } from "lucide-react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }: any) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
      Haptics.selectionAsync(); // 👈 subtle haptic on swipe
    }
  };

  return (
    <View style={styles.container}>
      {/* Skip */}
      <TouchableOpacity
        style={styles.skip}
        onPress={() => navigation.replace("PhoneAuthScreen")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={listRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnboardingItem item={item} />
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Pagination */}
      <OnboardingPagination
        index={index}
        total={onboardingData.length}
      />

      {/* CTA */}
      <View style={styles.cta}>
        <Button
          title={index === onboardingData.length - 1 ? "Get Started" : "Next"}
          onPress={() => {
            if (index === onboardingData.length - 1) {
              navigation.replace("PhoneAuthScreen");
            } else {
              listRef.current?.scrollToIndex({
                index: index + 1,
                animated: true,
              });
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
          transparent={true}
        />
      </View>

      {index == 0 ? <Package
        size={350}
        color="#000090"
        style={styles.icon} />
        : <PlaneTakeoff
          size={350}
          color="#000090"
          style={styles.icon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  skip: {
    position: "absolute",
    top: 100,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.8,
  },
  cta: {
    padding: 20,
    backgroundColor: "transparent",
    marginBottom: 30,
    zIndex: 1
  },
  icon: {
    position: "absolute",
    bottom: -75,
    right: -75,
    zIndex: 0,
    // opacity: 0.5
  }
});
