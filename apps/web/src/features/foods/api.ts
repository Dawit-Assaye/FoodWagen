import { FoodItem, FoodItemPayload, ServiceType } from "@foodwagen/types";
import { resolveFoodApiUrl } from "@foodwagen/config";

const defaultBaseUrl = resolveFoodApiUrl("").replace(/\/$/, "");

const withBase = (path: string) => `${defaultBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      message || "An unexpected error occurred while communicating with FoodWagen API.",
    );
  }

  return response.json() as Promise<T>;
};

const normalizeServiceType = (value?: string): ServiceType | undefined => {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  if (normalized === "delivery") return "Delivery";
  if (normalized === "pickup" || normalized === "pick-up") return "Pickup";
  return undefined;
};

export const fetchFoods = async (
  search?: string,
  serviceType?: ServiceType,
): Promise<FoodItem[]> => {
  const url = search?.trim()
    ? withBase(`/Food?name=${encodeURIComponent(search.trim())}`)
    : withBase("/Food");
  const response = await fetch(url, { cache: "no-store" });
  const data = await handleResponse<FoodItem[]>(response);

  if (!serviceType) {
    return data;
  }

  return data.filter((item) => {
    const itemType = normalizeServiceType(
      // Some APIs may use different casing or property names; attempt to map gracefully.
      (item as FoodItem & { service_type?: string; type?: string }).serviceType ??
        (item as { service_type?: string }).service_type ??
        (item as { type?: string }).type,
    );

    return (itemType ?? "Delivery") === serviceType;
  });
};

export const createFood = async (payload: FoodItemPayload): Promise<FoodItem> => {
  const response = await fetch(withBase("/Food"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<FoodItem>(response);
};

export const updateFood = async (id: string, payload: FoodItemPayload): Promise<FoodItem> => {
  const response = await fetch(withBase(`/Food/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<FoodItem>(response);
};

export const deleteFood = async (id: string): Promise<void> => {
  const response = await fetch(withBase(`/Food/${id}`), {
    method: "DELETE",
  });

  await handleResponse(response);
};
