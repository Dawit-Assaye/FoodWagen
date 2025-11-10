"use client";

import Image from "next/image";
import { FoodButton } from "@foodwagen/ui";
import type { FoodItem } from "@foodwagen/types";

type FoodCardProps = {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
  index?: number;
};

export const FoodCard = ({ food, onEdit, onDelete, index = 0 }: FoodCardProps) => {
  const { restaurant } = food;

  return (
    <article
      className="food-card food-flex food-flex-col food-gap-5 food-bg-white food-p-6 food-rounded-3xl food-shadow-raised food-transition-all food-duration-150 food-ease-out food-animate-food-slide-up hover:food-shadow-[0_24px_50px_rgba(17,24,39,0.16)]"
      style={{ animationDelay: `${index * 50}ms` }}
      data-test-id="food-card"
    >
      <div className="food-flex food-items-start food-justify-between food-gap-4">
        <div className="food-space-y-2">
          <h3 className="food-name food-text-2xl food-font-semibold food-text-secondary">
            {food.name}
          </h3>
          <p className="food-price food-text-lg food-font-medium food-text-primary">
            {food.price ? `$${food.price}` : "Price TBD"}
          </p>
          <p className="food-rating food-text-sm food-font-semibold food-text-accent">
            ⭐ {food?.rating} / 5
          </p>
        </div>
        <div className="food-h-24 food-w-24 food-overflow-hidden food-rounded-full food-bg-muted/20">
          <Image
            src={food.image}
            alt={`${food.name} image`}
            width={96}
            height={96}
            className="food-h-full food-w-full food-object-cover"
          />
        </div>
      </div>

      <div className="food-flex food-items-center food-justify-between food-rounded-2xl food-bg-primary/5 food-p-4">
        <div className="food-flex food-items-center food-gap-4 food-flex-1 food-min-w-0">
          {restaurant?.logo ? (
            <span className="food-relative food-h-12 food-w-12 food-flex-shrink-0 food-overflow-hidden food-rounded-full food-bg-white food-shadow-sm">
              <Image
                src={restaurant.logo}
                alt={`${restaurant.name ?? "Restaurant"} logo`}
                fill
                sizes="48px"
                className="restaurant-logo food-object-cover"
              />
            </span>
          ) : (
            <span className="restaurant-logo food-flex food-h-12 food-w-12 food-flex-shrink-0 food-items-center food-justify-center food-rounded-full food-bg-muted/40 food-text-sm food-font-semibold food-text-muted">
              ?
            </span>
          )}
          <div className="food-min-w-0 food-flex-1">
            <p className="restaurant-name food-text-base food-font-semibold food-text-secondary food-truncate">
              {restaurant?.name ?? "Unknown Restaurant"}
            </p>
            <p
              className={`restaurant-status food-text-sm food-font-medium ${
                restaurant?.status === "Open Now" ? "food-text-accent" : "food-text-red-500"
              }`}
            >
              {restaurant?.status ?? "Status unavailable"}
            </p>
          </div>
        </div>
        <div className="food-flex food-gap-3 food-flex-shrink-0">
          <FoodButton
            variant="ghost"
            data-test-id="food-edit-btn"
            aria-label={`Edit ${food.name}`}
            onClick={() => onEdit(food)}
            className="food-text-xs food-px-4 food-py-2"
          >
            Edit
          </FoodButton>
          <FoodButton
            variant="danger"
            data-test-id="food-delete-btn"
            aria-label={`Delete ${food.name}`}
            onClick={() => onDelete(food)}
            className="food-text-xs food-px-4 food-py-2"
          >
            Delete
          </FoodButton>
        </div>
      </div>
    </article>
  );
};
