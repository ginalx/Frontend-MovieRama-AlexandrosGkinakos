import { movieService } from "./movie.service.js";
import * as api from "./api.service.js";
import { referenceService } from "./reference.service.js";

describe("Movie Service", () => {
  api.apiService = {
    key: "test_key",
    baseUrl: "test_url/",
  };

  it("fetches genres and assigns them to the referenceService genres", function () {
    const testResponse = { genres: [{ name: "test genre" }] };

    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testResponse),
      })
    );

    expect(referenceService.genres).toStrictEqual([]);

    movieService
      .fetchGenres()
      .then(() =>
        expect(referenceService.genres).toStrictEqual(testResponse.genres)
      );
  });

  it("fetches movies based on search value and page", function () {
    const testResponse = { results: [{ poster: "test poster" }] };

    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testResponse),
      })
    );

    movieService.fetchMovies("test search", 3).then((res) => {
      expect(res).toStrictEqual(testResponse);
      expect(fetch).toHaveBeenCalledWith(
        "test_url/search/movietest_key&language=en-US&page=3&query=test search"
      );
    });
  });

  it("fetches now playing movies", function () {
    const testResponse = { results: [{ poster: "test poster" }] };

    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testResponse),
      })
    );

    movieService.fetchMovies("", 1).then((res) => {
      expect(res).toStrictEqual(testResponse);
      expect(fetch).toHaveBeenCalledWith(
        "test_url/movie/now_playingtest_key&language=en-US&page=1"
      );
    });
  });

  it("fetches related videos", function () {
    const testResponse = { results: [{ key: "test video key" }] };

    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testResponse),
      })
    );

    movieService.fetchVideos(123).then((res) => {
      expect(res).toStrictEqual(testResponse.results);
      expect(fetch).toHaveBeenCalledWith("test_url/movie/123/videostest_key");
    });
  });

  it("fetches related reviews", function () {
    const testResponse = { results: [{ content: "my test review" }] };

    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testResponse),
      })
    );

    movieService.fetchReviews(123).then((res) => {
      expect(res).toStrictEqual(testResponse.results);
      expect(fetch).toHaveBeenCalledWith("test_url/movie/123/reviewstest_key");
    });
  });

  it("fetches similar movies", function () {
    const testResponse = { results: [{ poster: "similar_movie_poster_path" }] };

    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testResponse),
      })
    );

    movieService.fetchSimilar(123).then((res) => {
      expect(res).toStrictEqual(testResponse.results);
      expect(fetch).toHaveBeenCalledWith("test_url/movie/123/similartest_key");
    });
  });
});
