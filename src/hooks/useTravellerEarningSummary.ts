import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { fetchTravellerEarningSummary } from "../api/trips";



export const useTravellerEarningSummary = () =>
  useQuery({
    queryKey: ["travellerEarningSummary"],
    queryFn: fetchTravellerEarningSummary,
    staleTime: 60 * 1000, // 1 min – earnings don't change every second
  });
