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
    <form onSubmit={handleSubmit} className="food-space-y-5" data-test-id={testId}>
      {errorMessage ? (
        <div className="food-rounded-lg food-bg-red-50 food-p-3 food-text-sm food-text-red-600" role="alert">
          {errorMessage}
        </div>
      ) : null}
      <div className="food-space-y-2">
        <label htmlFor="food_name" className="food-text-sm food-font-medium food-text-gray-700">
          Food name
        </label>
        <input
          id="food_name"
          name="food_name"
          type="text"
          placeholder="Enter food name"
          className="food-w-full food-rounded-lg food-border food-border-gray-300 food-bg-gray-50 food-px-4 food-py-3 food-text-sm focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
          aria-describedby={errors.food_name ? "food-name-error" : undefined}
          {...form.register("food_name")}
        />
        {errors.food_name && (
          <p id="food-name-error" className="food-text-xs food-text-red-600">
            {errors.food_name.message}
          </p>
        )}
      </div>
      <div className="food-space-y-2">
        <label htmlFor="food_rating" className="food-text-sm food-font-medium food-text-gray-700">
          Food rating
        </label>
        <input
          id="food_rating"
          name="food_rating"
          type="number"
          min={1}
          max={5}
          step="0.1"
          placeholder="Enter food rating"
          className="food-w-full food-rounded-lg food-border food-border-gray-300 food-bg-gray-50 food-px-4 food-py-3 food-text-sm focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
          aria-describedby={errors.food_rating ? "food-rating-error" : undefined}
          {...form.register("food_rating", { valueAsNumber: true })}
        />
        {errors.food_rating && (
          <p id="food-rating-error" className="food-text-xs food-text-red-600">
            {errors.food_rating.message}
          </p>
        )}
      </div>
      <div className="food-space-y-2">
        <label htmlFor="food_image" className="food-text-sm food-font-medium food-text-gray-700">
          Food image (link)
        </label>
        <input
          id="food_image"
          name="food_image"
          type="url"
          placeholder="Enter food image URL"
          className="food-w-full food-rounded-lg food-border food-border-gray-300 food-bg-gray-50 food-px-4 food-py-3 food-text-sm focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
          aria-describedby={errors.food_image ? "food-image-error" : undefined}
          {...form.register("food_image")}
        />
        {errors.food_image && (
          <p id="food-image-error" className="food-text-xs food-text-red-600">
            {errors.food_image.message}
          </p>
        )}
      </div>
      <div className="food-space-y-2">
        <label htmlFor="restaurant_name" className="food-text-sm food-font-medium food-text-gray-700">
          Restaurant name
        </label>
        <input
          id="restaurant_name"
          name="restaurant_name"
          type="text"
          placeholder="Enter restaurant name"
          className="food-w-full food-rounded-lg food-border food-border-gray-300 food-bg-gray-50 food-px-4 food-py-3 food-text-sm focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
          aria-describedby={errors.restaurant_name ? "restaurant-name-error" : undefined}
          {...form.register("restaurant_name")}
        />
        {errors.restaurant_name && (
          <p id="restaurant-name-error" className="food-text-xs food-text-red-600">
            {errors.restaurant_name.message}
          </p>
        )}
      </div>
      <div className="food-space-y-2">
        <label htmlFor="restaurant_logo" className="food-text-sm food-font-medium food-text-gray-700">
          Restaurant logo (link)
        </label>
        <input
          id="restaurant_logo"
          name="restaurant_logo"
          type="url"
          placeholder="Enter restaurant logo URL"
          className="food-w-full food-rounded-lg food-border food-border-gray-300 food-bg-gray-50 food-px-4 food-py-3 food-text-sm focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
          aria-describedby={errors.restaurant_logo ? "restaurant-logo-error" : undefined}
          {...form.register("restaurant_logo")}
        />
        {errors.restaurant_logo && (
          <p id="restaurant-logo-error" className="food-text-xs food-text-red-600">
            {errors.restaurant_logo.message}
          </p>
        )}
      </div>
      <div className="food-space-y-2">
        <label htmlFor="restaurant_status" className="food-text-sm food-font-medium food-text-gray-700">
          Restaurant status (open/close)
        </label>
        <select
          id="restaurant_status"
          name="restaurant_status"
          className="food-w-full food-rounded-lg food-border food-border-gray-300 food-bg-gray-50 food-px-4 food-py-3 food-text-sm focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
          aria-describedby={errors.restaurant_status ? "restaurant-status-error" : undefined}
          {...form.register("restaurant_status")}
        >
          {restaurantStatusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.restaurant_status && (
          <p id="restaurant-status-error" className="food-text-xs food-text-red-600">
            {errors.restaurant_status.message}
          </p>
        )}
      </div>
      <div className="food-flex food-justify-end food-gap-3 food-pt-4">
        <FoodButton
          type="button"
          variant="ghost"
          onClick={onCancel}
          data-test-id="food-cancel-btn"
          className="food-rounded-lg food-border food-border-gray-300 food-bg-white food-text-gray-700 hover:food-bg-gray-50"
        >
          Cancel
        </FoodButton>
        <FoodButton
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          data-test-id="food-submit-btn"
          className="food-rounded-lg food-bg-[#FF6B35] hover:food-bg-[#FF6B35]/90"
        >
          {isSubmitting ? pendingLabel : submitLabel}
        </FoodButton>
      </div>
    </form>
  );
};

