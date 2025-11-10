import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FoodItem, FoodItemPayload } from "@foodwagen/types";
import { createFood, deleteFood, fetchFoods, updateFood } from "./api";

const foodsQueryKey = (search: string) => ["foods", search] as const;

export const useFoodsQuery = (search: string) =>
  useQuery({
    queryKey: foodsQueryKey(search),
    queryFn: () => fetchFoods(search),
    staleTime: 60_000
  });

export const useFoodMutations = (search: string) => {
  const queryClient = useQueryClient();
  const invalidateFoods = () => queryClient.invalidateQueries({ queryKey: foodsQueryKey(search) });

  const createMutation = useMutation({
    mutationFn: (payload: FoodItemPayload) => createFood(payload),
    onSuccess: () => {
      void invalidateFoods();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FoodItemPayload }) => updateFood(id, payload),
    onSuccess: () => {
      void invalidateFoods();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFood(id),
    onSuccess: () => {
      void invalidateFoods();
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
};

export const toFoodPayload = (item: FoodItem): FoodItemPayload => {
  const { id, ...rest } = item;
  return rest;
};


