import { render, screen } from "@testing-library/react";
import { FoodCard } from "../components/food-card";
import type { FoodItem } from "@foodwagen/types";

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

describe("FoodCard", () => {
  it("renders food information with restaurant details", () => {
    const editSpy = vi.fn();
    const deleteSpy = vi.fn();

    render(<FoodCard food={mockFood} onEdit={editSpy} onDelete={deleteSpy} />);

    expect(screen.getByText("Food Truck Taco")).toBeInTheDocument();
    expect(screen.getByText("$12.00")).toBeInTheDocument();
    expect(screen.getByText(/⭐/)).toHaveTextContent("⭐ 4.8 / 5");
    expect(screen.getByText("Street Bites")).toBeInTheDocument();
    expect(screen.getByText("Open Now")).toBeInTheDocument();
  });
});


