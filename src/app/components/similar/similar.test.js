import { similar } from "./similar.js";
import * as s from "../../shared/services/movie.service.js";
import { referenceService } from "../../shared/services/reference.service.js";

describe("Similar", () => {
  referenceService.configuration = {
    images: { secure_base_url: "testUrl" },
  };
  s.movieService.fetchSimilar = jest.fn(() =>
    Promise.resolve([
      {
        poster_path: "test_poster_similar",
        original_title: "test similar title",
      },
    ])
  );

  it("creates a similar div element", function () {
    expect(similar({})).toBeDefined();
  });
});
