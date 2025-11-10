"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodButton, FoodInput } from "@foodwagen/ui";
import type { FoodItem } from "@foodwagen/types";
import { foodFormSchema, FoodFormValues, restaurantStatusOptions } from "../food-form-schema";

type FoodFormProps = {
  defaultValues?: Partial<FoodFormValues>;
  onSubmit: (values: FoodFormValues) => Promise<void> | void;
  onCancel: () => void;
  submitLabel: string;
  pendingLabel: string;
  isSubmitting: boolean;
  testId?: string;
  errorMessage?: string | null;
};

const defaultState: FoodFormValues = {
  food_name: "",
  food_rating: 1,
  food_image: "",
  restaurant_name: "",
  restaurant_logo: "",
  restaurant_status: "Open Now"
};

export const mapFoodToFormValues = (food?: FoodItem): FoodFormValues =>
  food
    ? {
        food_name: food.name,
        food_rating: food.rating,
        food_image: food.image,
        restaurant_name: food.restaurant?.name ?? "",
        restaurant_logo: food.restaurant?.logo ?? "",
        restaurant_status: food.restaurant?.status ?? "Open Now"
      }
    : defaultState;

export const FoodForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel,
  pendingLabel,
  isSubmitting,
  errorMessage,
  testId = "food-form"
}: FoodFormProps) => {
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: defaultValues ? { ...defaultState, ...defaultValues } : defaultState
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({ ...defaultState, ...defaultValues });
    }
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values);
    form.reset(defaultState);
  });

  const errors = form.formState.errors;

  return (
    <form onSubmit={handleSubmit} className="food-space-y-4" data-test-id={testId}>
      {errorMessage ? (
        <div className="food-rounded-2xl food-bg-red-50 food-p-4 food-text-sm food-text-red-600" role="alert">
          {errorMessage}
        </div>
      ) : null}
      <FoodInput
        label="Food Name"
        placeholder="Enter food name"
        {...form.register("food_name")}
        name="food_name"
        error={errors.food_name?.message}
        descriptionId="food-name-error"
      />
      <FoodInput
        label="Food Rating"
        type="number"
        min={1}
        max={5}
        step="0.1"
        placeholder="Enter food rating (1-5)"
        {...form.register("food_rating", { valueAsNumber: true })}
        name="food_rating"
        error={errors.food_rating?.message}
        descriptionId="food-rating-error"
      />
      <FoodInput
        label="Food Image URL"
        placeholder="Enter food image URL"
        {...form.register("food_image")}
        name="food_image"
        error={errors.food_image?.message}
        descriptionId="food-image-error"
      />
      <FoodInput
        label="Restaurant Name"
        placeholder="Enter food restaurant name"
        {...form.register("restaurant_name")}
        name="restaurant_name"
        error={errors.restaurant_name?.message}
        descriptionId="restaurant-name-error"
      />
      <FoodInput
        label="Restaurant Logo URL"
        placeholder="Enter food restaurant logo URL"
        {...form.register("restaurant_logo")}
        name="restaurant_logo"
        error={errors.restaurant_logo?.message}
        descriptionId="restaurant-logo-error"
      />
      <div className="food-flex food-flex-col food-gap-2">
        <label htmlFor="restaurant_status" className="food-text-sm food-font-medium food-text-secondary">
          Restaurant Status
        </label>
        <select
          id="restaurant_status"
          className="food-rounded-full food-border food-border-muted food-bg-white food-px-5 food-py-3 food-text-sm food-text-secondary focus:food-border-primary focus:food-ring-2 focus:food-ring-primary"
          {...form.register("restaurant_status")}
          name="restaurant_status"
          aria-describedby="restaurant-status-error"
        >
          {restaurantStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.restaurant_status ? (
          <p id="restaurant-status-error" className="food-text-xs food-text-red-600">
            {errors.restaurant_status.message}
          </p>
        ) : null}
      </div>
      <div className="food-flex food-justify-end food-gap-3 food-pt-4">
        <FoodButton type="button" variant="ghost" onClick={onCancel} data-test-id="food-cancel-btn">
          Cancel
        </FoodButton>
        <FoodButton type="submit" variant="primary" isLoading={isSubmitting} data-test-id="food-submit-btn">
          {isSubmitting ? pendingLabel : submitLabel}
        </FoodButton>
      </div>
    </form>
  );
};

