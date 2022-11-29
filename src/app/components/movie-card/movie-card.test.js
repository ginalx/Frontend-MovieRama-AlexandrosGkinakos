import { movieCard } from "./movie-card.js";
import * as info from "../additional-info/additional-info.js";
import { referenceService } from "../../shared/services/reference.service.js";

describe("Movie Card", () => {
  referenceService.configuration = {
    images: { secure_base_url: "testUrl" },
  };
  info.additionalInfo = jest.fn(() => document.createElement("div"));

  it("creates a movie card", function () {
    const card = movieCard({});

    expect(card).toBeDefined();
  });

  it("toggles the movie card on click", function () {
    const card = movieCard({});

    expect(card.classList.contains("active")).toBeFalsy();

    card.querySelector(".card-snapshot").click();

    expect(card.classList.contains("active")).toBeTruthy();
  });

  it("appends an image with src pointing to the movie poster", function () {
    expect(
      movieCard({ poster_path: "test_card_poster_path" }).querySelector(
        ".card-poster"
      ).src
    ).toEqual(expect.stringContaining("testUrlw185test_card_poster_path"));
  });
});
