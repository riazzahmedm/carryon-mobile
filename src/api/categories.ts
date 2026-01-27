import { api } from "./client";

export type DeliveryCategory = {
  id: string;
  label: string;
};

export const getDeliveryCategories = async (): Promise<DeliveryCategory[]> => {
  const res = await api.get("/delivery-categories");
  return res.data;
};
