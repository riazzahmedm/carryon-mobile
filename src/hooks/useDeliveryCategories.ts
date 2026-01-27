import { useQuery } from "@tanstack/react-query";
import { getDeliveryCategories } from "../api/categories";

export const useDeliveryCategories = () =>
  useQuery({
    queryKey: ["deliveryCategories"],
    queryFn: getDeliveryCategories,
  });
