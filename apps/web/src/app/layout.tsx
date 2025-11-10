import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "../providers/app-providers";

export const metadata: Metadata = {
  title: "FoodWagen – Manage Food Listings",
  description: "Search, curate, and manage food items with a delightful UI built for the CoreDev assessment."
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="food-min-h-screen food-bg-[#F8F8F8]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;


