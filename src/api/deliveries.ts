import { api } from "./client";

export type CreateDeliveryPayload = {
  itemName: string;
  itemCategory: string;
  weightKg: number;
  declaredValue: number;
  fromCity: string,
  toCity: string,
  travelDate: string,
};

export const createDelivery = async (
  payload: CreateDeliveryPayload
) => {
  const res = await api.post("/deliveries", payload);
  return res.data; // delivery object
};

export const getMyDeliveries = async () => {
  const res = await api.get("/deliveries/my");
  return res.data;
};


export const matchDelivery = async (
  deliveryId: string,
  tripId: string
) => {
  const res = await api.post(
    `/deliveries/${deliveryId}/match`,
    { tripId }
  );
  return res.data;
};