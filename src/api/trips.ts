import { TripStatus } from "../utils/common";
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
  tripStatus: TripStatus;
};

type TravellerEarningSummary = {
  pending: number;
  completed: number;
};

export const getMyTrips = async (): Promise<Trip[]> => {
  const res = await api.get("/trips/my");
  return res.data;
};

export const createTrip = async (data: {
  fromCity: string;
  toCity: string;
  flightDate: string;
  capacityKg: number;
}) => {
  const res = await api.post("/trips", data);
  return res.data;
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

export const fetchTravellerEarningSummary = async (): Promise<TravellerEarningSummary> => {
  const res = await api.get("/trips/earnings/summary");
  return res.data;
};
