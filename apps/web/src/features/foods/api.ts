import { FoodItem, FoodItemPayload } from "@foodwagen/types";
import { resolveFoodApiUrl } from "@foodwagen/config";

const defaultBaseUrl = resolveFoodApiUrl("").replace(/\/$/, "");

const withBase = (path: string) => `${defaultBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "An unexpected error occurred while communicating with FoodWagen API.");
  }

  return response.json() as Promise<T>;
};

export const fetchFoods = async (search?: string): Promise<FoodItem[]> => {
  const url = search?.trim() ? withBase(`/Food?name=${encodeURIComponent(search.trim())}`) : withBase("/Food");
  const response = await fetch(url, { cache: "no-store" });
  return handleResponse<FoodItem[]>(response);
};

export const createFood = async (payload: FoodItemPayload): Promise<FoodItem> => {
  const response = await fetch(withBase("/Food"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return handleResponse<FoodItem>(response);
};

export const updateFood = async (id: string, payload: FoodItemPayload): Promise<FoodItem> => {
  const response = await fetch(withBase(`/Food/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return handleResponse<FoodItem>(response);
};

export const deleteFood = async (id: string): Promise<void> => {
  const response = await fetch(withBase(`/Food/${id}`), {
    method: "DELETE"
  });

  await handleResponse(response);
};


