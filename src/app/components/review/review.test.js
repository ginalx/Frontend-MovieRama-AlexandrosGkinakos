import { review } from "./review.js";
import * as s from "../../shared/services/movie.service.js";
import { referenceService } from "../../shared/services/reference.service.js";

describe("Review", () => {
  referenceService.configuration = {
    images: { secure_base_url: "testUrl" },
  };
  s.movieService.fetchReviews = jest.fn(() =>
    Promise.resolve([
      {
        author: "test author",
        created_at: "2022-11-29",
        content: "The best movie ever",
        author_details: {
          avatar_path: "test_avatar_path",
          rating: 10,
        },
      },
    ])
  );

  it("creates a review div element", function () {
    expect(review({})).toBeDefined();
  });

  it("renders a review card with all relevant info", async function () {
    const result = review({});

    await new Promise(process.nextTick);

    expect(result.querySelector(".review-avatar").src).toEqual(
      expect.stringContaining("testUrlw45test_avatar_path")
    );
    expect(result.querySelector(".review-author").textContent).toBe(
      "test author"
    );
    expect(result.querySelector(".review-date").textContent).toBe(
      "November 29, 2022"
    );
  });
});
