import { render, screen } from "@testing-library/react";
import { FoodCard } from "../components/food-card";
import type { FoodItem } from "@foodwagen/types";
import { describe, it, expect, vi } from "vitest";

const mockFood: FoodItem = {
  id: "1",
  name: "Food Truck Taco",
  rating: 4.8,
  price: 12,
  image: "https://images.example.com/taco.jpg",
  restaurant: {
    name: "Street Bites",
    logo: "https://images.example.com/logo.png",
    status: "Open Now"
  }
};

describe("FoodCard - Component Rendering", () => {
  it("renders food information with restaurant details", () => {
    const editSpy = vi.fn();
    const deleteSpy = vi.fn();

    render(<FoodCard food={mockFood} onEdit={editSpy} onDelete={deleteSpy} />);

    expect(screen.getByText("Food Truck Taco")).toBeInTheDocument();
    expect(screen.getByText(/\$12\.00/)).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("Open Now")).toBeInTheDocument();
    expect(screen.getByTestId("food-card")).toBeInTheDocument();
  });

  it("renders card with required CSS classes", () => {
    const editSpy = vi.fn();
    const deleteSpy = vi.fn();

    const { container } = render(<FoodCard food={mockFood} onEdit={editSpy} onDelete={deleteSpy} />);

    expect(container.querySelector(".food-name")).toBeInTheDocument();
    expect(container.querySelector(".food-price")).toBeInTheDocument();
    expect(container.querySelector(".food-rating")).toBeInTheDocument();
    expect(container.querySelector(".restaurant-logo")).toBeInTheDocument();
    expect(container.querySelector(".restaurant-status")).toBeInTheDocument();
  });
});

