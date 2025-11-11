"use client";

import { useState } from "react";
import { FoodButton } from "@foodwagen/ui";
import Image from "next/image";

type HeroSectionProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
};

type DeliveryType = "Delivery" | "Pickup";

export const HeroSection = ({ onSearch, searchQuery }: HeroSectionProps) => {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("Delivery");
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  return (
    <section className="food-relative food-w-full food-bg-[#FFB30E] food-overflow-hidden">
      <div className="food-container food-relative food-z-10 food-py-12 md:food-py-16 lg:food-py-20">
        <div className="food-grid food-grid-cols-1 lg:food-grid-cols-2 food-gap-8 food-items-center">
          {/* Left side - Text and Search */}
          <div className="food-space-y-6 food-text-white">
            <div className="food-space-y-3">
              <h2 className="food-text-4xl md:food-text-5xl lg:food-text-6xl food-font-bold">
                Are you starving?
              </h2>
              <p className="food-text-lg md:food-text-xl food-text-white/90">
                Within a few clicks, find meals that are accessible near you
              </p>
            </div>

            {/* Delivery/Pickup Toggle */}
            <div className="food-flex food-gap-2">
              <button
                type="button"
                onClick={() => setDeliveryType("Delivery")}
                className={`food-flex food-items-center food-gap-2 food-px-6 food-py-3 food-rounded-lg food-font-medium food-transition-all ${
                  deliveryType === "Delivery"
                    ? "food-bg-white food-text-[#FF6B35]"
                    : "food-bg-white/20 food-text-white hover:food-bg-white/30"
                }`}
              >
                <svg
                  className="food-w-5 food-h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType("Pickup")}
                className={`food-flex food-items-center food-gap-2 food-px-6 food-py-3 food-rounded-lg food-font-medium food-transition-all ${
                  deliveryType === "Pickup"
                    ? "food-bg-white food-text-[#FF6B35]"
                    : "food-bg-white/20 food-text-white hover:food-bg-white/30"
                }`}
              >
                <svg
                  className="food-w-5 food-h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Pickup
              </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="food-w-full">
              <div className="food-bg-white food-rounded-2xl food-p-4 food-shadow-lg">
                <div className="food-flex food-gap-3">
                  <div className="food-flex-1 food-relative">
                    <svg
                      className="food-absolute food-left-4 food-top-1/2 food-transform -food-translate-y-1/2 food-w-5 food-h-5 food-text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      placeholder="What do you like to eat today?"
                      className="food-w-full food-pl-12 food-pr-4 food-py-3 food-rounded-lg food-border food-border-gray-200 focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
                    />
                  </div>
                  <FoodButton
                    type="submit"
                    variant="primary"
                    className="food-rounded-lg food-px-6 food-py-3 food-flex food-items-center food-gap-2"
                  >
                    <svg
                      className="food-w-5 food-h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Find Meal
                  </FoodButton>
                </div>
              </div>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="food-relative food-hidden lg:food-block">
            <div className="food-relative food-w-full food-h-96 food-flex food-items-center food-justify-center">
              <div className="food-relative food-w-full food-h-full food-max-w-md">
                <Image
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80"
                  alt="Delicious ramen bowl"
                  fill
                  className="food-object-contain food-rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

