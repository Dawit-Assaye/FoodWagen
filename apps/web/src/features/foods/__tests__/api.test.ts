import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchFoods } from "../api";

const originalFetch = global.fetch;

describe("Food API", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("fetches foods with search query", async () => {
    const mockResponse = [
      {
        id: "1",
        name: "Food Pasta",
        rating: 4.2,
        image: "https://example.com/pasta.png"
      }
    ];

    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    const result = await fetchFoods("Pasta");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/Food?name=Pasta"),
      expect.objectContaining({ cache: "no-store" })
    );
    expect(result).toEqual(mockResponse);
  });
});


