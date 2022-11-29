import { additionalInfo } from "./additional-info.js";
import * as s from "../../shared/services/movie.service.js";

describe("Additional Info", () => {
  s.movieService.fetchVideos = jest.fn(() => Promise.resolve([]));
  s.movieService.fetchReviews = jest.fn(() => Promise.resolve([]));
  s.movieService.fetchSimilar = jest.fn(() => Promise.resolve([]));

  it("creates an additional info div element", function () {
    expect(additionalInfo({})).toBeDefined();
  });
});
