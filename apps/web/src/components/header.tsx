"use client";

import { FoodButton } from "@foodwagen/ui";

type HeaderProps = {
  onAddMealClick: () => void;
};

export const Header = ({ onAddMealClick }: HeaderProps) => {
  const handleClick = () => {
    // Try to use the exposed handler first, otherwise use the prop
    if ((window as any).__openAddMealModal) {
      (window as any).__openAddMealModal();
    } else {
      onAddMealClick();
    }
  };

  return (
    <header className="food-w-full food-bg-white food-px-4 md:food-px-6 lg:food-px-8 food-py-4">
      <div className="food-container food-flex food-items-center food-justify-between">
        <div className="food-flex food-items-center food-gap-3">
          <div className="food-relative food-h-10 food-w-10">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="food-h-full food-w-full"
            >
              <path
                d="M20 5L25 15H35L27 22L30 32L20 27L10 32L13 22L5 15H15L20 5Z"
                fill="#FF6B35"
              />
            </svg>
          </div>
          <h1 className="food-text-2xl food-font-bold food-text-gray-800">FoodWagen</h1>
        </div>
        <FoodButton
          variant="secondary"
          onClick={handleClick}
          className="food-rounded-lg food-px-6 food-py-2"
        >
          Add Meal
        </FoodButton>
      </div>
    </header>
  );
};

