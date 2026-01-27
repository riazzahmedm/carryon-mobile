import { api } from "./client";

export const requestOtp = async (phone: string) => {
  const res = await api.post("/auth/request-otp", { phone });
  return res.data;
};

export const verifyOtp = async (phone: string, otp: string) => {
  const res = await api.post("/auth/verify-otp", { phone, otp });
  return res.data; // { accessToken }
};