import { useQuery } from "@tanstack/react-query";
import { searchTrips } from "../api/trips";

export const useSearchTrips = (
  fromCity: string,
  toCity: string,
  date: string
) =>
  useQuery({
    queryKey: ["searchTrips", fromCity, toCity, date],
    queryFn: () => searchTrips({ fromCity, toCity, date }),
    enabled: !!fromCity && !!toCity && !!date,
  });
