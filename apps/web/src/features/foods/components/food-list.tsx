"use client";

import type { FoodItem } from "@foodwagen/types";
import { FoodCard } from "./food-card";

type FoodListProps = {
  foods: FoodItem[];
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
};

export const FoodList = ({ foods, onEdit, onDelete }: FoodListProps) => {
  if (!foods.length) {
    return (
      <div className="food-rounded-3xl food-bg-white food-p-12 food-text-center food-shadow-raised">
        <div className="food-space-y-3">
          <p className="food-text-lg food-font-semibold food-text-secondary">No items available</p>
          <p
            className="empty-state-message food-text-sm food-text-muted"
            data-test-id="food-empty-state"
          >
            Add a food item to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-grid food-gap-6 food-grid-cols-1 md:food-grid-cols-2 xl:food-grid-cols-3">
      {foods.map((food, index) => (
        <FoodCard key={food.id} food={food} onEdit={onEdit} onDelete={onDelete} index={index} />
      ))}
    </div>
  );
};
