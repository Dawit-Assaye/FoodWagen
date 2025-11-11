import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FoodForm } from "../components/food-form";
import { describe, it, expect, vi } from "vitest";

describe("FoodForm - User Interaction (Form Input and Submission)", () => {
  it("submits values and resets the form", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const onCancel = vi.fn();

    render(
      <FoodForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        submitLabel="Add Food"
        pendingLabel="Adding Food..."
        isSubmitting={false}
      />
    );

    const foodNameInput = screen.getByPlaceholderText("Enter food name");
    const foodRatingInput = screen.getByPlaceholderText("Enter food rating");
    const foodImageInput = screen.getByPlaceholderText("Enter food image URL");
    const restaurantNameInput = screen.getByPlaceholderText("Enter restaurant name");
    const restaurantLogoInput = screen.getByPlaceholderText("Enter restaurant logo URL");
    const restaurantStatusSelect = screen.getByLabelText(/Restaurant status/i);

    fireEvent.change(foodNameInput, { target: { value: "Food Burger" } });
    fireEvent.change(foodRatingInput, { target: { value: "4.5" } });
    fireEvent.change(foodImageInput, { target: { value: "https://example.com/image.png" } });
    fireEvent.change(restaurantNameInput, { target: { value: "Burger House" } });
    fireEvent.change(restaurantLogoInput, { target: { value: "https://example.com/logo.png" } });
    fireEvent.change(restaurantStatusSelect, { target: { value: "Closed" } });

    const submitButton = screen.getByTestId("food-submit-btn");
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        food_name: "Food Burger",
        food_rating: 4.5,
        food_image: "https://example.com/image.png",
        restaurant_name: "Burger House",
        restaurant_logo: "https://example.com/logo.png",
        restaurant_status: "Closed"
      })
    );

    await waitFor(() => {
      expect(foodNameInput).toHaveValue("");
    });
  });

  it("shows validation errors for required fields", async () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(
      <FoodForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        submitLabel="Add Food"
        pendingLabel="Adding Food..."
        isSubmitting={false}
      />
    );

    const submitButton = screen.getByTestId("food-submit-btn");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Food Name is required")).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});

