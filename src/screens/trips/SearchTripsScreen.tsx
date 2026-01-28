import { Text, ActivityIndicator, FlatList } from "react-native";
import { Screen } from "../../components/Screen";
import { useSearchTrips } from "../../hooks/useSearchTrips";
import { TripCard } from "../../components/TripCard";

export default function SearchTripsScreen({ route, navigation }: any) {
  const { fromCity, toCity, date } = route.params;

  const { data, isLoading, isError } = useSearchTrips(
    fromCity,
    toCity,
    date
  );

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <Text>Failed to load travellers</Text>
      </Screen>
    );
  }

  if (data.length === 0) {
    return (
      <Screen>
        <Text>No travellers found for this route.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={{ fontWeight: "600", marginBottom: 12 }}>
        Travellers from {fromCity} → {toCity}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onSelect={() =>
              navigation.navigate("Pricing", {
                tripId: item.id,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
