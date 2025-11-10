"use client";

import { ChangeEvent } from "react";
import { FoodInput } from "@foodwagen/ui";

type FoodSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const FoodSearchBar = ({ value, onChange }: FoodSearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <form className="food-w-full food-max-w-xl">
      <FoodInput
        label="Search food items"
        value={value}
        onChange={handleChange}
        placeholder="Search food name"
        name="food_search"
        data-test-id="food-search-input"
        aria-label="Search food items"
      />
    </form>
  );
};


