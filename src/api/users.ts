import { api } from "./client";

export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (payload: {
  fullName: string;
  email?: string;
}) => {
  const res = await api.patch("/users/me", payload);
  return res.data;
};