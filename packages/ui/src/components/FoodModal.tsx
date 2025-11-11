import { PropsWithChildren, ReactNode } from "react";
import { FoodButton } from "./FoodButton";

export type FoodModalProps = PropsWithChildren<{
  title: string;
  description?: string;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
}>;

const sizeMap: Record<NonNullable<FoodModalProps["size"]>, string> = {
  sm: "food-max-w-md",
  md: "food-max-w-xl",
  lg: "food-max-w-2xl",
};

export const FoodModal = ({
  title,
  description,
  footer,
  isOpen,
  onClose,
  size = "md",
  children,
}: FoodModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="food-fixed food-inset-0 food-z-50 food-flex food-items-center food-justify-center food-bg-black/40 food-backdrop-blur food-p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`food-w-full food-max-h-[90vh] food-overflow-y-auto food-rounded-2xl food-bg-white food-p-6 food-shadow-xl food-animate-food-slide-up md:food-mx-auto ${sizeMap[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="food-mb-6">
          <h2 className="food-text-2xl food-font-bold food-text-[#FF6B35] food-text-center">
            {title}
          </h2>
        </header>
        <section>{children}</section>
        {footer ? (
          <footer className="food-flex food-justify-end food-gap-3 food-mt-6">{footer}</footer>
        ) : null}
      </div>
    </div>
  );
};
