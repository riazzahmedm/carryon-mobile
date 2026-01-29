import { api } from "./client";

export type PricingQuote = {
  base: number;
  weightCost: number;
  risk: "LOW" | "REVIEW" | "HIGH";
  platformFee: number;
  total: number;
};

export const getPricingQuote = async (
  deliveryId: string,
  tripId: string
): Promise<PricingQuote> => {
  const res = await api.post("/pricing/quote", {
    deliveryId,
    tripId
  });
  return res.data;
};
