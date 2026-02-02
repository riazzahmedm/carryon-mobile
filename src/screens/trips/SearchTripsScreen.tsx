import { Text, ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { useSearchTrips } from "../../hooks/useSearchTrips";
import { TripCard } from "../../components/TripCard";
import { colors, spacing, typography } from "../../theme";
import { ScreenHeader } from "../../components/ScreenHeader";

export default function SearchTripsScreen({ route, navigation }: any) {
  const { deliveryId, fromCity, toCity, date } = route.params;

  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useSearchTrips(deliveryId, fromCity, toCity, date);

  /* Loading */
  if (isLoading) {
    return (
      <Screen>
        <ActivityIndicator style={{ marginTop: 40 }} />
      </Screen>
    );
  }

  /* Error */
  if (isError) {
    return (
      <Screen>
        <Text style={styles.errorText}>
          Failed to load travellers
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <ScreenHeader
          title="Available travellers"
          onBack={() => navigation.goBack()}
        />

        <Text style={styles.subtitle}>
          {fromCity} → {toCity}
        </Text>

        <Text style={styles.meta}>
          Travel date: {date}
        </Text>
      </View>

      {/* List */}
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
        contentContainerStyle={{
          paddingBottom: spacing.xl,
        }}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              No travellers found
            </Text>
            <Text style={styles.emptySubtitle}>
              Try another date or route
            </Text>
          </View>
        }
      />
    </Screen>
  );
}


const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },

  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },

  meta: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  emptyState: {
    marginTop: 48,
    alignItems: "center",
  },

  emptyTitle: {
    ...typography.body,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },

  emptySubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  errorText: {
    marginTop: 40,
    textAlign: "center",
    color: colors.danger,
  },
})
