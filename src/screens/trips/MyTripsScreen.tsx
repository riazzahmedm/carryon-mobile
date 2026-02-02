import { Text, ActivityIndicator, FlatList, View } from "react-native";
import { Screen } from "../../components/Screen";
import { useMyTrips } from "../../hooks/useMyTrips";
import { TripCard } from "../../components/TripCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { TravellerEarningsCard } from "../../components/TravellerEarningsCard";
import { colors, spacing, typography } from "../../theme";

export default function MyTripsScreen({ navigation }: any) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useMyTrips();

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
        <Text style={styles.error}>Failed to load trips</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My trips</Text>
        <Text style={styles.subtitle}>
          Manage your upcoming and past trips
        </Text>
      </View>

      {/* Earnings summary */}
      <TravellerEarningsCard />

      {/* Trips list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onSelect={() =>
              navigation.navigate("TripDetails", {
                trip: item,
              })
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No trips yet
          </Text>
        }
      />
    </Screen>
  );
}

const styles = {
  header: {
    marginBottom: spacing.md,
  },

  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  empty: {
    textAlign: "center",
    marginTop: spacing.xl,
    color: colors.textSecondary,
  },

  error: {
    marginTop: spacing.xl,
    textAlign: "center",
    color: colors.danger,
  },
};
