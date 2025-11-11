"use client";

import { useEffect, useState } from "react";
import { FoodButton } from "@foodwagen/ui";
import Image from "next/image";
import type { ServiceType } from "@foodwagen/types";

type HeroSectionProps = {
  onSearch: (query: string) => void;
  searchQuery: string;
  serviceType: ServiceType;
  onServiceTypeChange: (type: ServiceType) => void;
};

export const HeroSection = ({
  onSearch,
  searchQuery,
  serviceType,
  onServiceTypeChange,
}: HeroSectionProps) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

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

            <div className="food-bg-white food-rounded-2xl food-p-4 food-shadow-lg">
              {/* Delivery/Pickup Toggle */}
              <div className="food-flex food-gap-2">
                <button
                  type="button"
                  onClick={() => onServiceTypeChange("Delivery")}
                  className={`food-flex food-items-center food-gap-2 food-px-6 food-py-1 food-rounded-lg food-font-medium food-transition-all ${
                    serviceType === "Delivery"
                      ? " food-text-[#FF6B35] food-bg-primary/10"
                      : "food-bg-gray/20 food-text-gray-500 hover:food-bg-gray/30"
                  }`}
                >
                  <svg
                    width="23"
                    height="14"
                    viewBox="0 0 23 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0703 4.5C20.5312 4.53516 22.5352 6.53906 22.5703 8.96484C22.5703 11.4961 20.5312 13.5352 18 13.5C15.5742 13.5 13.5703 11.4961 13.5703 9.03516C13.5352 7.66406 14.168 6.43359 15.1172 5.58984L14.6953 4.85156C13.3242 5.97656 12.6562 7.59375 12.7266 9.24609C12.7266 9.73828 12.3398 10.125 11.8828 10.125H8.92969C8.40234 12.0938 6.64453 13.5 4.57031 13.5C2.03906 13.5 0 11.4609 0.0703125 8.89453C0.105469 6.53906 2.00391 4.60547 4.39453 4.53516C4.88672 4.5 5.37891 4.57031 5.83594 4.71094L6.22266 3.97266C5.90625 3.48047 5.41406 3.09375 4.57031 3.09375H2.60156C2.10938 3.09375 1.75781 2.74219 1.75781 2.28516C1.72266 1.79297 2.14453 1.40625 2.60156 1.40625H4.57031C6.50391 1.40625 7.45312 2.00391 8.05078 2.8125H13.4648L12.7969 1.6875H10.4766C10.1602 1.6875 9.91406 1.44141 9.91406 1.125V0.5625C9.91406 0.28125 10.1602 0 10.4766 0H13.2891C13.5703 0 13.8516 0.175781 13.9922 0.421875L14.8008 1.75781L16.1016 0.28125C16.2773 0.105469 16.4883 0 16.7344 0H18.3516C18.8086 0 19.1953 0.386719 19.1953 0.84375V1.96875C19.1953 2.46094 18.8086 2.8125 18.3516 2.8125H15.4336L16.5938 4.74609C17.0508 4.60547 17.5781 4.5 18.0703 4.5ZM4.57031 11.8125C5.69531 11.8125 6.67969 11.1445 7.13672 10.125H4.28906C3.62109 10.125 3.23438 9.45703 3.55078 8.89453L4.99219 6.22266C4.85156 6.22266 4.71094 6.1875 4.57031 6.1875C2.98828 6.1875 1.75781 7.45312 1.75781 9C1.75781 10.582 2.98828 11.8125 4.57031 11.8125ZM20.8477 9.17578C20.9531 7.55859 19.6523 6.1875 18.0703 6.22266C17.8594 6.22266 17.6836 6.22266 17.5078 6.25781L19.1953 9.10547C19.3711 9.38672 19.2656 9.73828 19.0195 9.87891L18.5273 10.1602C18.2461 10.3359 17.9297 10.2305 17.7539 9.98438L16.0312 7.06641C15.5391 7.59375 15.2578 8.26172 15.2578 9C15.2578 10.6172 16.5938 11.918 18.2109 11.8125C19.6172 11.7422 20.7773 10.582 20.8477 9.17578Z"
                      fill={serviceType === "Delivery" ? "#F17228" : "#757575"}
                    />
                  </svg>
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => onServiceTypeChange("Pickup")}
                  className={`food-flex food-items-center food-gap-2 food-px-6 food-py-1 food-rounded-lg food-font-medium food-transition-all ${
                    serviceType === "Pickup"
                      ? " food-text-[#FF6B35] food-bg-primary/10"
                      : "food-bg-gray/20 food-text-gray-500 hover:food-bg-gray/30"
                  }`}
                >
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.375 5.625H15.75V15.1875C15.75 16.7695 14.4844 18 12.9375 18H2.8125C1.23047 18 0 16.7695 0 15.1875V5.625H3.375V4.5C3.375 2.03906 5.37891 0 7.875 0C10.3359 0 12.375 2.03906 12.375 4.5V5.625ZM5.625 4.5V5.625H10.125V4.5C10.125 3.26953 9.10547 2.25 7.875 2.25C6.60938 2.25 5.625 3.26953 5.625 4.5ZM11.25 8.71875C11.707 8.71875 12.0938 8.36719 12.0938 7.875C12.0938 7.41797 11.707 7.03125 11.25 7.03125C10.7578 7.03125 10.4062 7.41797 10.4062 7.875C10.4062 8.36719 10.7578 8.71875 11.25 8.71875ZM4.5 8.71875C4.95703 8.71875 5.34375 8.36719 5.34375 7.875C5.34375 7.41797 4.95703 7.03125 4.5 7.03125C4.00781 7.03125 3.65625 7.41797 3.65625 7.875C3.65625 8.36719 4.00781 8.71875 4.5 8.71875Z"
                      fill={serviceType === "Pickup" ? "#F17228" : "#757575"}
                    />
                  </svg>
                  Pickup
                </button>
              </div>

              {/* Search Bar */}
              <form
                className="food-w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearch(localSearch);
                }}
              >
                <div className=" food-rounded-2xl food-p-4 food-shadow-lg">
                  <div className="food-flex food-gap-3">
                    <div className="food-flex-1 food-relative">
                      <svg
                        className="food-absolute food-left-4 food-top-1/2 food-transform -food-translate-y-1/2 food-w-5 food-h-5 food-text-gray-400"
                        fill="none"
                        stroke="#FF6B35"
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
                        onChange={(e) => {
                          const next = e.target.value;
                          setLocalSearch(next);
                          onSearch(next);
                        }}
                        placeholder="What do you like to eat today?"
                        className="food-text-black food-w-full food-pl-12 food-pr-4 food-py-3 food-rounded-lg food-border food-border-gray-200 focus:food-outline-none focus:food-ring-2 focus:food-ring-[#FF6B35] focus:food-border-transparent"
                      />
                    </div>
                    <FoodButton
                      type="submit"
                      variant="primary"
                      className="food-rounded-lg food-px-6 food-py-3 food-flex food-items-center food-gap-2"
                    >
                      <svg
                        className="food-w-4 food-h-4"
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
          </div>

          {/* Right side - Image */}
          <div className="food-hidden lg:food-block lg:food-ml-20 lg:food-shadow-md lg:shadow-black/50">
            <div className="food-relative lg:food-absolute  lg:-food-bottom-14 lg:food-w-[22rem] xl:food-w-[28rem]">
              <div className="food-relative food-h-[24rem] lg:food-h-[26rem] xl:food-h-[28rem] food-w-full">
                <Image
                  src="/hero-section-image.png"
                  alt="Delicious ramen bowl"
                  fill
                  className="food-object-contain food-pointer-events-none"
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
