import { Text, ActivityIndicator, FlatList } from "react-native";
import { Screen } from "../../components/Screen";
import { useSearchTrips } from "../../hooks/useSearchTrips";
import { TripCard } from "../../components/TripCard";
import { useEffect } from "react";

export default function SearchTripsScreen({ route, navigation }: any) {
  const { deliveryId, fromCity, toCity, date } = route.params;
  const normalizedDate = new Date(date).toISOString().split("T")[0];

  const { data, isLoading, isError,
    refetch,
    isRefetching,
  } = useSearchTrips(
    deliveryId,
    fromCity,
    toCity,
    normalizedDate
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
                deliveryId,
                tripId: item.id,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </Screen>
  );
}
