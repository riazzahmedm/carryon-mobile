
export type TripStatus =
  | "AVAILABLE"
  | "MATCHED"
  | "IN_TRANSIT"
  | "COMPLETED";


export const STATUS_COLORS: Record<TripStatus, string>  = {
  AVAILABLE: "#2E7D32",
  MATCHED: "#ED6C02",
  IN_TRANSIT: "#0288D1",
  COMPLETED: "#6D6D6D"
};

export type DeliveryStatus = 
  | "CREATED"
  | "MATCHED"
  | "REJECTED"
  | "PICKED_UP"
  | "DELIVERED";

export const DEL_STATUS_COLORS: Record<DeliveryStatus, string>  = {
  CREATED: "#1DABD6",
  MATCHED: "#ED6C02",
  REJECTED: "#C41919",
  PICKED_UP: "#872AE4",
  DELIVERED: "#2E7D32",
};

export type Airport = {
  code: string;   // HYD
  label: string;  // Hyderabad (HYD)
};

export const airports: Airport[] = [
  { code: "HYD", label: "Hyderabad (HYD)" },
  { code: "BLR", label: "Bangalore (BLR)" },
  { code: "DEL", label: "Delhi (DEL)" },
  { code: "BOM", label: "Mumbai (BOM)" },
  { code: "MAA", label: "Chennai (MAA)" },
];
