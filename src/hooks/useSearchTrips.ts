import { useQuery } from "@tanstack/react-query";
import { searchTrips } from "../api/trips";

export const useSearchTrips = (
  deliveryId: string,
  fromCity: string,
  toCity: string,
  date: string
) =>
  useQuery({
    queryKey: ["searchTrips", deliveryId],
    queryFn: () => searchTrips({ fromCity, toCity, date }),
    enabled: Boolean(deliveryId && fromCity && toCity && date),
  });