import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  approveDelivery,
  rejectDelivery,
  pickupDelivery,
  confirmDelivery,
} from "../api/deliveries";

/**
 * Traveller actions on a delivery
 * Automatically refreshes trip deliveries after each action
 */
export const useDeliveryActions = (tripId: string) => {
  const queryClient = useQueryClient();

   const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["tripDeliveries", tripId] });
    queryClient.invalidateQueries({ queryKey: ["myTrips"] });
  };

  const approve = useMutation({
    mutationFn: (deliveryId: string) => approveDelivery(deliveryId),
    onSuccess: invalidateAll,
  });

  const reject = useMutation({
    mutationFn: (deliveryId: string) => rejectDelivery(deliveryId),
    onSuccess: invalidateAll,
  });

  const pickup = useMutation({
    mutationFn: (deliveryId: string) => pickupDelivery(deliveryId),
    onSuccess: invalidateAll,
  });

  const deliver = useMutation({
    mutationFn: (deliveryId: string) => confirmDelivery(deliveryId),
    onSuccess: invalidateAll,
  });

  return {
    approve,
    reject,
    pickup,
    deliver,
  };
};
