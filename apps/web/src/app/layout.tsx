import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "../providers/app-providers";

export const metadata: Metadata = {
  title: "FoodWagen – Find Meals Near You",
  description: "Within a few clicks, find meals that are accessible near you. Order delivery or pickup from your favorite restaurants."
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="food-min-h-screen food-bg-white">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;


