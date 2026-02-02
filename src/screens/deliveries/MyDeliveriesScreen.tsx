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

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator style={{ marginTop: 40 }} />
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <Text style={{ marginTop: 40 }}>
          Failed to load deliveries
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Header */}
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 4 }}>
        My deliveries
      </Text>
      <Text style={{ color: "#666", marginBottom: 16 }}>
        Track and manage items you’ve sent
      </Text>

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
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={
          <Text style={{ marginTop: 40, textAlign: "center", color: "#666" }}>
            No deliveries yet
          </Text>
        }
      />
    </Screen>
  );
}

