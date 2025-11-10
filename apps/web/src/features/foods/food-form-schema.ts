import { z } from "zod";

export const restaurantStatusOptions = ["Open Now", "Closed"] as const;

export const foodFormSchema = z.object({
  food_name: z
    .string({ required_error: "Food Name is required" })
    .min(1, { message: "Food Name is required" }),
  food_rating: z
    .coerce
    .number({
      invalid_type_error: "Food Rating must be a number"
    })
    .min(1, { message: "Food Rating must be a number" })
    .max(5, { message: "Food Rating must be a number" }),
  food_image: z
    .string({ required_error: "Food Image URL is required" })
    .url({ message: "Food Image URL is required" }),
  restaurant_name: z
    .string({ required_error: "Restaurant Name is required" })
    .min(1, { message: "Restaurant Name is required" }),
  restaurant_logo: z
    .string({ required_error: "Restaurant Logo URL is required" })
    .url({ message: "Restaurant Logo URL is required" }),
  restaurant_status: z.enum(restaurantStatusOptions, {
    errorMap: () => ({ message: "Restaurant Status must be 'Open Now' or 'Closed'" })
  })
});

export type FoodFormValues = z.infer<typeof foodFormSchema>;

