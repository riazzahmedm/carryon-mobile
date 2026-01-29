import { Text, ActivityIndicator, FlatList } from "react-native";
import { Screen } from "../../components/Screen";
import { useMyDeliveries } from "../../hooks/useMyDeliveries";
import { DeliveryCard } from "../../components/DeliveryCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function MyDeliveriesScreen({ navigation }: any) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useMyDeliveries();

  // Refetch when screen comes into focus
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
        <Text>Failed to load deliveries</Text>
      </Screen>
    );
  }

  if (data.length === 0) {
    return (
      <Screen>
        <Text>No deliveries yet.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeliveryCard
            delivery={item}
            onPress={() => {
              if (item.status === "CREATED") {
                navigation.navigate("SearchTrips", {
                  deliveryId: item.id,
                  fromCity: item.fromCity,
                  toCity: item.toCity,
                  date: item.travelDate.split("T")[0],
                });
              }
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </Screen>
  );
}
