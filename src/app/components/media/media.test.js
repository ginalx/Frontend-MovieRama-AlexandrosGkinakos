import { media } from "./media.js";
import * as s from "../../shared/services/movie.service.js";
import { referenceService } from "../../shared/services/reference.service.js";

describe("Media", () => {
  referenceService.configuration = {
    images: { secure_base_url: "testUrl" },
  };
  s.movieService.fetchVideos = jest.fn(() => Promise.resolve([]));

  it("creates a media  element", function () {
    expect(media({})).toBeDefined();
  });

  it("selects the official trailer", async function () {
    s.movieService.fetchVideos = jest.fn(() =>
      Promise.resolve([
        {
          type: "Trailer",
          name: "Official Trailer",
          key: "test_official_trailer",
        },
      ])
    );
    const result = media({});
    await new Promise(process.nextTick);
    expect(result.querySelector(".media").src).toBe(
      "https://www.youtube.com/embed/test_official_trailer"
    );
  });

  it("selects any trailer that includes 'Official Trailer' in its name", async function () {
    s.movieService.fetchVideos = jest.fn(() =>
      Promise.resolve([
        {
          type: "Trailer",
          name: "Official Trailer 3",
          key: "test_official_trailer3",
        },
      ])
    );
    const result = media({});
    await new Promise(process.nextTick);
    expect(result.querySelector(".media").src).toBe(
      "https://www.youtube.com/embed/test_official_trailer3"
    );
  });

  it("selects any clip if trailer is not found", async function () {
    s.movieService.fetchVideos = jest.fn(() =>
      Promise.resolve([
        {
          type: "test_media_type",
          name: "test media name",
          key: "test_any_clip",
        },
      ])
    );
    const result = media({});
    await new Promise(process.nextTick);
    expect(result.querySelector(".media").src).toBe(
      "https://www.youtube.com/embed/test_any_clip"
    );
  });
});
