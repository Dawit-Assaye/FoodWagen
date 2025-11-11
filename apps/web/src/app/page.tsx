"use client";

import { useState } from "react";
import type { ServiceType } from "@foodwagen/types";
import { FoodDashboard } from "../features/foods/components/food-dashboard";
import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { Footer } from "../components/footer";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("Delivery");

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
      <HeroSection
        onSearch={handleSearch}
        searchQuery={searchQuery}
        serviceType={serviceType}
        onServiceTypeChange={setServiceType}
      />
      <main className="food-flex-1 food-bg-gray-50">
        <FoodDashboard
          onAddMealClick={handleAddMealClick}
          searchQuery={searchQuery}
          serviceType={serviceType}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
