"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { FoodItem } from "@foodwagen/types";

type FoodCardProps = {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
  index?: number;
};

export const FoodCard = ({ food, onEdit, onDelete, index = 0 }: FoodCardProps) => {
  const { restaurant } = food;
  const isOpen = restaurant?.status === "Open Now";
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <article
      className="food-bg-white food-rounded-2xl food-overflow-hidden food-shadow-md food-transition-all food-duration-[150ms] food-ease-out hover:food-shadow-xl food-animate-food-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
      data-test-id="food-card"
    >
      <div className="food-relative food-w-full food-h-48 food-bg-gray-200">
        <Image
          src={food.image}
          alt={`${food.name} image`}
          fill
          className="food-object-cover food-rounded-xl"
        />
        {food.price && !isNaN(food.price) && (
          <div className="food-flex food-items-center food-gap-2 food-absolute food-top-3 food-left-3 food-bg-[#FF6B35] food-text-white food-px-3 food-py-1 food-rounded-lg food-text-sm food-font-semibold">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 8.89453V1.6875C0 0.773438 0.738281 0 1.6875 0H8.85938C9.31641 0 9.73828 0.210938 10.0547 0.527344L17.4727 7.94531C18.1406 8.61328 18.1406 9.70312 17.4727 10.3359L10.3008 17.5078C9.66797 18.1758 8.57812 18.1758 7.91016 17.5078L0.492188 10.0898C0.175781 9.77344 0 9.35156 0 8.89453ZM3.9375 2.25C2.98828 2.25 2.25 3.02344 2.25 3.9375C2.25 4.88672 2.98828 5.625 3.9375 5.625C4.85156 5.625 5.625 4.88672 5.625 3.9375C5.625 3.02344 4.85156 2.25 3.9375 2.25Z"
                fill="white"
              />
            </svg>
            <span className="food-price">
              ${typeof food.price === "number" ? food.price.toFixed(2) : Number(food.price).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="food-py-4 food-space-y-3 food-w-full ">
        <div className="food-flex food-items-center food-gap-3 food-w-full ">
          {restaurant?.logo ? (
            <div className="restaurant-logo food-relative food-h-10 food-w-10 food-flex-shrink-0 food-overflow-hidden food-rounded-md food-bg-gray-100">
              <Image
                src={restaurant.logo}
                alt={`${restaurant.name ?? "Restaurant"} logo`}
                fill
                sizes="40px"
                className="food-object-cover"
              />
            </div>
          ) : (
            <div className="restaurant-logo food-h-10 food-w-10 food-flex-shrink-0 food-flex food-items-center food-justify-center food-rounded-md food-bg-gray-200 food-text-xs food-font-semibold food-text-gray-600">
              ?
            </div>
          )}
          <div className="food-flex-1 food-w-full">
            <div className="food-flex food-items-center food-justify-between food-gap-2 ">
              <h3 className="food-name food-text-lg food-font-semibold food-text-gray-800 food-truncate">
                {food.name}
              </h3>
              <div className="food-relative" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="food-w-8 food-h-8 food-flex food-items-center food-justify-center"
                  aria-label="More options"
                >
                  <svg
                    className="food-w-5 food-h-5 food-text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                {showMenu && (
                  <div className="food-absolute food-right-0 food-mt-2 food-w-32 food-bg-white food-rounded-lg food-shadow-lg food-py-1 food-z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                        onEdit(food);
                      }}
                      className="food-w-full food-text-left food-px-4 food-py-2 food-text-sm food-text-gray-700 hover:food-bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(false);
                        onDelete(food);
                      }}
                      className="food-w-full food-text-left food-px-4 food-py-2 food-text-sm food-text-red-600 hover:food-bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="food-flex food-items-center food-gap-1 food-mt-1">
              <svg
                className="food-w-4 food-h-4 food-text-secondary food-fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="food-rating food-text-sm food-font-medium food-text-secondary">
                {food.rating != null
                  ? (typeof food.rating === "number" ? food.rating : Number(food.rating)).toFixed(1)
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`restaurant-status food-w-fit food-py-2 food-px-4 food-rounded-xl food-text-sm food-font-semibold food-text-center ${
            isOpen
              ? "food-bg-green-600/10 food-text-green-600"
              : "food-bg-secondary/10 food-text-secondary"
          }`}
        >
          {restaurant?.status ?? "Closed"}
        </div>
      </div>
    </article>
  );
};
