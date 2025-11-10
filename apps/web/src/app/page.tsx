import { FoodDashboard } from "../features/foods/components/food-dashboard";

const HomePage = () => {
  return (
    <main className="food-min-h-screen food-py-8 md:food-py-12">
      <div className="food-container">
        <FoodDashboard />
      </div>
    </main>
  );
};

export default HomePage;
