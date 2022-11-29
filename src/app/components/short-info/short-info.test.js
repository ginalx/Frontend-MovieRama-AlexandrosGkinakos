import { shortInfo } from "./short-info.js";
import { referenceService } from "../../shared/services/reference.service.js";

describe("Short info", () => {
  it("creates a short info element", function () {
    expect(shortInfo({})).toBeDefined();
  });

  it("appends the release date", function () {
    expect(
      shortInfo({ release_date: "2022-11-29" }).querySelector(
        ".short-info-genre-list"
      ).textContent
    ).toBe("2022");
  });

  it("appends the genre list", function () {
    referenceService.genres = [
      { id: 1, name: "Action" },
      { id: 2, name: "Adventure" },
    ];

    expect(
      shortInfo({ genre_ids: [1, 2] }).querySelector(".short-info-genre-list")
        .textContent
    ).toBe(" · Action, Adventure");
  });

  it("displays a dash if vote count is 0", function () {
    expect(
      shortInfo({ vote_count: 0 }).querySelector(".short-info-rating")
        .textContent
    ).toBe("-");
  });

  it("displays the vote average", function () {
    expect(
      shortInfo({ vote_average: 8 }).querySelector(".short-info-rating")
        .textContent
    ).toBe("8");
  });
});
