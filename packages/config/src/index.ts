import { z } from "zod";

export const foodwagenEnvSchema = z.object({
  NEXT_PUBLIC_FOOD_API_BASE_URL: z
    .string()
    .url()
    .default("https://6852821e0594059b23cdd834.mockapi.io"),
});

export type FoodWagenEnv = z.infer<typeof foodwagenEnvSchema>;

export const loadFoodwagenEnv = (env: NodeJS.ProcessEnv): FoodWagenEnv => {
  const parsed = foodwagenEnvSchema.safeParse(env);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};

export const resolveFoodApiUrl = (
  path = "/Food",
  env: FoodWagenEnv | NodeJS.ProcessEnv = process.env,
) => {
  const base =
    "NEXT_PUBLIC_FOOD_API_BASE_URL" in env && env.NEXT_PUBLIC_FOOD_API_BASE_URL
      ? env.NEXT_PUBLIC_FOOD_API_BASE_URL
      : foodwagenEnvSchema.parse(env).NEXT_PUBLIC_FOOD_API_BASE_URL;

  if (!base) {
    throw new Error("Food API base URL is not defined in environment variables.");
  }

  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
};
