import { useQuery } from "@tanstack/react-query";
import { getMyTrips } from "../api/trips";

export const useMyTrips = () =>
  useQuery({
    queryKey: ["myTrips"],
    queryFn: getMyTrips,
  });
