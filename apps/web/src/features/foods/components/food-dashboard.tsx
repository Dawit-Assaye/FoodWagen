"use client";

import { useMemo, useState, useEffect } from "react";
import { FoodButton, FoodModal, FoodSpinner } from "@foodwagen/ui";
import type { FoodItem, FoodItemPayload, ServiceType } from "@foodwagen/types";
import { FoodSearchBar } from "./food-search-bar";
import { FoodList } from "./food-list";
import { FoodForm, mapFoodToFormValues } from "./food-form";
import { FoodFormValues } from "../food-form-schema";
import { useFoodMutations, useFoodsQuery } from "../hooks";

const toPayload = (values: FoodFormValues, serviceType: ServiceType): FoodItemPayload => ({
  name: values.food_name,
  rating: Number(values.food_rating),
  image: values.food_image,
  restaurant: {
    name: values.restaurant_name,
    logo: values.restaurant_logo,
    status: values.restaurant_status,
  },
  serviceType,
});

type FoodDashboardProps = {
  onAddMealClick?: () => void;
  searchQuery?: string;
  serviceType: ServiceType;
};

export const FoodDashboard = ({
  onAddMealClick,
  searchQuery = "",
  serviceType,
}: FoodDashboardProps) => {
  const [isAddOpen, setAddOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [deletingFood, setDeletingFood] = useState<FoodItem | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    data: foods = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useFoodsQuery(searchQuery, serviceType);
  const { createMutation, updateMutation, deleteMutation } = useFoodMutations(
    searchQuery,
    serviceType,
  );

  const filteredFoods = useMemo(() => {
    return foods.filter((item) => {
      const currentType =
        item.serviceType ??
        (item as FoodItem & { service_type?: string; type?: string }).serviceType ??
        ((item as { service_type?: string }).service_type as ServiceType | undefined) ??
        ((item as { type?: string }).type as ServiceType | undefined);

      if (!currentType) {
        return serviceType === "Delivery";
      }

      return currentType === serviceType;
    });
  }, [foods, serviceType]);

  const sortedFoods = useMemo(
    () =>
      filteredFoods.slice().sort((a, b) => {
        const ratingA = typeof a.rating === "number" ? a.rating : Number(a.rating) || 0;
        const ratingB = typeof b.rating === "number" ? b.rating : Number(b.rating) || 0;
        return ratingB - ratingA;
      }),
    [filteredFoods],
  );

  const handleEditRequest = (food: FoodItem) => {
    setUpdateError(null);
    setEditingFood(food);
  };

  const handleDeleteRequest = (food: FoodItem) => {
    setDeleteError(null);
    setDeletingFood(food);
  };

  const handleCreate = async (values: FoodFormValues) => {
    try {
      setCreateError(null);
      await createMutation.mutateAsync(toPayload(values, serviceType));
      setAddOpen(false);
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Unable to add food right now. Try again later.",
      );
    }
  };

  const handleUpdate = async (values: FoodFormValues) => {
    if (!editingFood) return;
    try {
      setUpdateError(null);
      await updateMutation.mutateAsync({
        id: editingFood.id,
        payload: {
          ...toPayload(values, editingFood.serviceType ?? serviceType),
        },
      });
      setEditingFood(null);
    } catch (err) {
      setUpdateError(
        err instanceof Error ? err.message : "Unable to update food right now. Try again later.",
      );
    }
  };

  const handleDelete = async () => {
    if (!deletingFood) return;
    try {
      setDeleteError(null);
      await deleteMutation.mutateAsync(deletingFood.id);
      setDeletingFood(null);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Unable to delete food right now. Try again later.",
      );
    }
  };

  useEffect(() => {
    if (onAddMealClick) {
      const openAddModal = () => {
        setCreateError(null);
        setAddOpen(true);
      };
      (window as any).__openAddMealModal = openAddModal;
    }
    return () => {
      if ((window as any).__openAddMealModal) {
        delete (window as any).__openAddMealModal;
      }
    };
  }, [onAddMealClick, serviceType]);

  return (
    <div className="food-container food-py-8 md:food-py-12">
      <section className="food-space-y-8" aria-live="polite">
        <div className="food-text-center food-mb-8">
          <h2 className="food-text-3xl md:food-text-4xl food-font-bold food-text-gray-800 food-mb-2">
            Featured Meals
          </h2>
        </div>
        {isLoading ? (
          <div className="food-flex food-flex-col food-items-center food-justify-center food-rounded-3xl food-bg-white food-p-12 food-shadow-raised food-gap-4">
            <FoodSpinner className="food-h-10 food-w-10" />
            <p className="food-text-base food-text-muted">Loading food items...</p>
          </div>
        ) : isError ? (
          <div className="food-rounded-3xl food-bg-red-50 food-p-8 food-text-center food-shadow-raised">
            <p className="food-text-base food-font-semibold food-text-red-600">
              Failed to load food items.
            </p>
            <p className="food-text-sm food-text-red-500">
              {error instanceof Error ? error.message : "Unknown error."}
            </p>
          </div>
        ) : (
          <>
            {isFetching ? (
              <div className="food-flex food-items-center food-gap-3 food-text-muted">
                <FoodSpinner className="food-h-5 food-w-5" />
                <span className="food-text-sm">Refreshing food list…</span>
              </div>
            ) : null}
            <FoodList
              foods={sortedFoods}
              onEdit={handleEditRequest}
              onDelete={handleDeleteRequest}
            />
          </>
        )}
      </section>

      <FoodModal
        title="Add Food"
        isOpen={isAddOpen}
        onClose={() => {
          setAddOpen(false);
          setCreateError(null);
        }}
        size="md"
      >
        <FoodForm
          onSubmit={handleCreate}
          onCancel={() => setAddOpen(false)}
          submitLabel="Add Food"
          pendingLabel="Adding Food..."
          isSubmitting={createMutation.isPending}
          errorMessage={createError}
        />
      </FoodModal>

      <FoodModal
        title="Edit Food"
        isOpen={Boolean(editingFood)}
        onClose={() => {
          setEditingFood(null);
          setUpdateError(null);
        }}
        size="md"
      >
        <FoodForm
          defaultValues={mapFoodToFormValues(editingFood ?? undefined)}
          onSubmit={handleUpdate}
          onCancel={() => setEditingFood(null)}
          submitLabel="Save"
          pendingLabel="Updating Food..."
          isSubmitting={updateMutation.isPending}
          testId="food-edit-form"
          errorMessage={updateError}
        />
      </FoodModal>

      <FoodModal
        title="Delete Food"
        isOpen={Boolean(deletingFood)}
        onClose={() => {
          setDeletingFood(null);
          setDeleteError(null);
        }}
        size="sm"
      >
        <div className="food-space-y-6">
          <p className="food-text-sm food-text-gray-700">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>
          {deleteError ? (
            <div
              className="food-rounded-lg food-bg-red-50 food-p-3 food-text-sm food-text-red-600"
              role="alert"
            >
              {deleteError}
            </div>
          ) : null}
          <div className="food-flex food-justify-end food-gap-3">
            <FoodButton
              variant="ghost"
              onClick={() => setDeletingFood(null)}
              data-test-id="food-delete-cancel-btn"
              className="food-rounded-lg food-border food-border-[#FF6B35] food-bg-white food-text-[#FF6B35] hover:food-bg-gray-50"
            >
              Cancel
            </FoodButton>
            <FoodButton
              variant="primary"
              onClick={handleDelete}
              isLoading={deleteMutation.isPending}
              data-test-id="food-delete-confirm-btn"
              className="food-rounded-lg food-bg-[#FF6B35] hover:food-bg-[#FF6B35]/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Yes"}
            </FoodButton>
          </div>
        </div>
      </FoodModal>
    </div>
  );
};
