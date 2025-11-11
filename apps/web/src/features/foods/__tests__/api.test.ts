import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchFoods } from "../api";

const originalFetch = global.fetch;

describe("Food API - API Mocking (Successful Data Fetch)", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("fetches foods with search query successfully", async () => {
    const mockResponse = [
      {
        id: "1",
        name: "Food Pasta",
        rating: 4.2,
        price: 15.99,
        image: "https://example.com/pasta.png",
        restaurant: {
          name: "Italian Bistro",
          logo: "https://example.com/logo.png",
          status: "Open Now"
        }
      }
    ];

    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    const result = await fetchFoods("Pasta", "Delivery");
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/Food?name=Pasta"),
      expect.objectContaining({ cache: "no-store" })
    );
    expect(result).toEqual(mockResponse);
  });

  it("handles API error gracefully", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Network error")
    );

    await expect(fetchFoods("Pasta", "Delivery")).rejects.toThrow("Network error");
  });

  it("handles non-ok response", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error"
    });

    await expect(fetchFoods("Pasta", "Delivery")).rejects.toThrow();
  });
});

