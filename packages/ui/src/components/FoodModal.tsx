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
        className={`food-w-full food-max-h-[90vh] food-overflow-y-auto food-rounded-3xl food-bg-white food-p-6 food-shadow-raised food-animate-food-slide-up food-space-y-6 md:food-mx-auto ${sizeMap[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="food-flex food-items-start food-justify-between food-gap-4">
          <div className="food-space-y-2">
            <h2 className="food-text-2xl food-font-semibold food-text-secondary">{title}</h2>
            {description ? <p className="food-text-sm food-text-muted">{description}</p> : null}
          </div>
          <FoodButton
            variant="ghost"
            aria-label="Close modal"
            data-test-id="food-modal-close-btn"
            onClick={onClose}
          >
            Close
          </FoodButton>
        </header>
        <section className="food-space-y-4">{children}</section>
        {footer ? (
          <footer className="food-flex food-justify-end food-gap-3">{footer}</footer>
        ) : null}
      </div>
    </div>
  );
};
