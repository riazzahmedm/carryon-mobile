import { api } from "./client";

export type Trip = {
  id: string;
  fromCity: string;
  toCity: string;
  flightDate: string;
  capacityKg: number;
  user: {
    id: string;
    fullName: string;
  };
};

export const searchTrips = async (params: {
  fromCity: string;
  toCity: string;
  date: string;
}): Promise<Trip[]> => {
  const res = await api.get("/trips/search", {
    params,
  });
  return res.data;
};
