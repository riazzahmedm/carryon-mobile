import { api } from "./client";

export type CreateDeliveryPayload = {
  itemName: string;
  itemCategory: string;
  weightKg: number;
  declaredValue: number;
};

export const createDelivery = async (
  payload: CreateDeliveryPayload
) => {
  const res = await api.post("/deliveries", payload);
  return res.data; // delivery object
};
