import { Text, ActivityIndicator, FlatList } from "react-native";
import { Screen } from "../../components/Screen";
import { useMyTrips } from "../../hooks/useMyTrips";
import { TripCard } from "../../components/TripCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function MyTripsScreen({ navigation }: any) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useMyTrips();
  
  // Refresh when tab gains focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
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
        <Text>Failed to load trips</Text>
      </Screen>
    );
  }

  if (data.length === 0) {
    return (
      <Screen>
        <Text>No trips yet.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onSelect={() =>
              navigation.navigate("TripDetails", {
                trip: item,
                navigation
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
