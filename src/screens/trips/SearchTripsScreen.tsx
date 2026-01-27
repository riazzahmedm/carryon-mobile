import { Text } from "react-native";
import { Screen } from "../../components/Screen";

export default function SearchTripsScreen({ route }: any) {
  const { deliveryId } = route.params;

  return (
    <Screen>
      <Text>Search trips for delivery: {deliveryId}</Text>
    </Screen>
  );
}
