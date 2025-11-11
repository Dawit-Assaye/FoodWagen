"use client";

import { useState } from "react";
import { FoodDashboard } from "../features/foods/components/food-dashboard";
import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { Footer } from "../components/footer";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddMealClick = () => {
    // Trigger the modal in the dashboard
    if ((window as any).__openAddMealModal) {
      (window as any).__openAddMealModal();
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="food-min-h-screen food-flex food-flex-col">
      <Header onAddMealClick={handleAddMealClick} />
      <HeroSection onSearch={handleSearch} searchQuery={searchQuery} />
      <main className="food-flex-1 food-bg-gray-50">
        <FoodDashboard
          onAddMealClick={handleAddMealClick}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
