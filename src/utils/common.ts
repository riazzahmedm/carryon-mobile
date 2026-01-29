
export type TripStatus =
  | "AVAILABLE"
  | "MATCHED"
  | "IN_TRANSIT"
  | "COMPLETED";

export const STATUS_COLORS: Record<TripStatus, string>  = {
  AVAILABLE: "#2E7D32",
  MATCHED: "#ED6C02",
  IN_TRANSIT: "#0288D1",
  COMPLETED: "#6D6D6D",
};