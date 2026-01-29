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

export const approveDelivery = async (deliveryId: string) => {
  const res = await api.post(`/deliveries/${deliveryId}/approve`);
  return res.data;
};

export const rejectDelivery = async (deliveryId: string) => {
  const res = await api.post(`/deliveries/${deliveryId}/reject`);
  return res.data;
};

export const pickupDelivery = async (deliveryId: string) => {
  const res = await api.post(`/deliveries/${deliveryId}/pickup`);
  return res.data;
};

export const confirmDelivery = async (deliveryId: string) => {
  const res = await api.post(`/deliveries/${deliveryId}/confirm`);
  return res.data;
};