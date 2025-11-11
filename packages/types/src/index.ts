export type ServiceType = "Delivery" | "Pickup";

export type RestaurantStatus = "Open Now" | "Closed";

export type Restaurant = {
  id?: string;
  name: string;
  logo: string;
  status: RestaurantStatus;
};

export type FoodItem = {
  id: string;
  name: string;
  rating: number;
  price?: number;
  image: string;
  restaurant?: Restaurant;
  serviceType?: ServiceType;
  createdAt?: string;
  updatedAt?: string;
};

export type FoodItemPayload = Omit<FoodItem, "id"> & {
  id?: string;
};
