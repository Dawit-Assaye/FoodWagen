"use client";

import { useMemo, useState } from "react";
import { FoodButton, FoodModal, FoodSpinner } from "@foodwagen/ui";
import type { FoodItem } from "@foodwagen/types";
import { FoodSearchBar } from "./food-search-bar";
import { FoodList } from "./food-list";
import { FoodForm, mapFoodToFormValues } from "./food-form";
import { FoodFormValues } from "../food-form-schema";
import { useFoodMutations, useFoodsQuery } from "../hooks";

const toPayload = (values: FoodFormValues) => ({
  name: values.food_name,
  rating: Number(values.food_rating),
  image: values.food_image,
  restaurant: {
    name: values.restaurant_name,
    logo: values.restaurant_logo,
    status: values.restaurant_status,
  },
});

export const FoodDashboard = () => {
  const [search, setSearch] = useState("");
  const [isAddOpen, setAddOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [deletingFood, setDeletingFood] = useState<FoodItem | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: foods = [], isLoading, isError, error, isFetching } = useFoodsQuery(search);
  const { createMutation, updateMutation, deleteMutation } = useFoodMutations(search);

  const sortedFoods = useMemo(() => foods.slice().sort((a, b) => b.rating - a.rating), [foods]);

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
      await createMutation.mutateAsync(toPayload(values));
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
        payload: toPayload(values),
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

  return (
    <div className="food-space-y-12">
      <header className="food-flex food-flex-col food-gap-6">
        <div className="food-flex food-flex-col md:food-flex-row md:food-items-center md:food-justify-between food-gap-6">
          <div className="food-space-y-2">
            <h1 className="food-text-3xl md:food-text-4xl food-font-bold food-text-secondary">
              FoodWagen Dashboard
            </h1>
            <p className="food-text-sm md:food-text-base food-text-muted food-max-w-2xl">
              Manage featured food items, keep restaurant details up to date, and delight your
              customers.
            </p>
          </div>
          <FoodButton
            variant="primary"
            onClick={() => {
              setCreateError(null);
              setAddOpen(true);
            }}
            data-test-id="food-add-btn"
            disabled={createMutation.isPending}
            isLoading={createMutation.isPending}
          >
            {createMutation.isPending ? "Adding Food..." : "Add Food"}
          </FoodButton>
        </div>
        <FoodSearchBar value={search} onChange={setSearch} />
      </header>

      <section className="food-space-y-6" aria-live="polite">
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

      <footer className="food-rounded-3xl food-bg-secondary food-p-10 food-text-white">
        <div className="food-flex food-flex-col md:food-flex-row md:food-items-center md:food-justify-between food-gap-6">
          <div>
            <h2 className="food-text-xl food-font-semibold">FoodWagen</h2>
            <p className="food-text-sm food-text-white/70">
              Curating great meals for modern foodies.
            </p>
          </div>
          <nav className="food-flex food-gap-6" aria-label="Footer navigation">
            <a className="food-text-sm food-font-medium" href="#menu">
              Menu
            </a>
            <a className="food-text-sm food-font-medium" href="#about">
              About
            </a>
            <a className="food-text-sm food-font-medium" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </footer>

      <FoodModal
        title="Add Food Item"
        description="Provide details for the new delicious food item."
        isOpen={isAddOpen}
        onClose={() => {
          setAddOpen(false);
          setCreateError(null);
        }}
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
        title={`Edit ${editingFood?.name ?? "Food"}`}
        description="Update food details and restaurant information."
        isOpen={Boolean(editingFood)}
        onClose={() => {
          setEditingFood(null);
          setUpdateError(null);
        }}
      >
        <FoodForm
          defaultValues={mapFoodToFormValues(editingFood ?? undefined)}
          onSubmit={handleUpdate}
          onCancel={() => setEditingFood(null)}
          submitLabel="Update Food"
          pendingLabel="Updating Food..."
          isSubmitting={updateMutation.isPending}
          testId="food-edit-form"
          errorMessage={updateError}
        />
      </FoodModal>

      <FoodModal
        title={`Delete ${deletingFood?.name ?? "Food"}?`}
        description="This action cannot be undone. The food item will be permanently removed."
        isOpen={Boolean(deletingFood)}
        onClose={() => {
          setDeletingFood(null);
          setDeleteError(null);
        }}
      >
        <div className="food-space-y-4">
          <p className="food-text-sm food-text-secondary">
            Confirm you want to delete <strong>{deletingFood?.name}</strong> and remove it from your
            catalog.
          </p>
          {deleteError ? (
            <div
              className="food-rounded-2xl food-bg-red-50 food-p-4 food-text-sm food-text-red-600"
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
            >
              Cancel
            </FoodButton>
            <FoodButton
              variant="danger"
              onClick={handleDelete}
              isLoading={deleteMutation.isPending}
              data-test-id="food-delete-confirm-btn"
            >
              {deleteMutation.isPending ? "Deleting Food..." : "Delete Food"}
            </FoodButton>
          </div>
        </div>
      </FoodModal>
    </div>
  );
};
