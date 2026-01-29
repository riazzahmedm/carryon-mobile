import { useQuery } from "@tanstack/react-query";
import { getMyDeliveries } from "../api/deliveries";

export const useMyDeliveries = () =>
  useQuery({
    queryKey: ["myDeliveries"],
    queryFn: getMyDeliveries,
  });
