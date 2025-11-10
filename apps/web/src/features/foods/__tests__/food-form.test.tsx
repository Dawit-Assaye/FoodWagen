import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FoodForm } from "../components/food-form";

describe("FoodForm", () => {
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

    fireEvent.change(screen.getByLabelText("Food Name"), { target: { value: "Food Burger" } });
    fireEvent.change(screen.getByLabelText("Food Rating"), { target: { value: "4.5" } });
    fireEvent.change(screen.getByLabelText("Food Image URL"), { target: { value: "https://example.com/image.png" } });
    fireEvent.change(screen.getByLabelText("Restaurant Name"), { target: { value: "Burger House" } });
    fireEvent.change(screen.getByLabelText("Restaurant Logo URL"), {
      target: { value: "https://example.com/logo.png" }
    });
    fireEvent.change(screen.getByLabelText("Restaurant Status"), { target: { value: "Closed" } });

    fireEvent.submit(screen.getByTestId("food-form"));

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
      expect(screen.getByLabelText("Food Name")).toHaveValue("");
    });
  });
});


