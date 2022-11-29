import * as m from "./shared/services/movie.service.js";
import * as c from "./shared/services/configuration.service.js";
import { referenceService } from "./shared/services/reference.service.js";

describe("Index", () => {
  m.movieService.fetchVideos = jest.fn(() => Promise.resolve([]));
  m.movieService.fetchReviews = jest.fn(() => Promise.resolve([]));
  m.movieService.fetchSimilar = jest.fn(() => Promise.resolve([]));
  m.movieService.fetchMovies = jest.fn(() =>
    Promise.resolve({
      results: [
        {
          original_title: "Movie 1",
          genre_ids: [1, 2],
          release_date: "2022-10-19",
        },
        {
          original_title: "Movie 2",
          genre_ids: [1, 3],
          release_date: "2021-11-22",
        },
      ],
    })
  );
  m.movieService.fetchGenres = jest.fn(() => Promise.resolve([]));
  c.configurationService.fetchConfiguration = jest.fn(() =>
    Promise.resolve({})
  );
  referenceService.genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Horror" },
  ];
  referenceService.configuration = {
    images: { secure_base_url: "testUrl" },
  };
  document.body.innerHTML = `
    <div class="toolbar">
      <span>MovieRama</span>
      <input
        id="search-input"
        type="text"
        name="search"
        class="search-input"
        placeholder="Search for movies"
      />
    </div>
    <h1 id="page-title">Now playing movies</h1>
    <div id="movie-list"></div>
  `;

  beforeEach(async () => {
    await import("./index.js");
    window.scrollTo = jest.fn();
  });

  it("displays a list of movie cards", async function () {
    expect(document.querySelectorAll(".card").length).toBe(2);
    expect(
      [...document.querySelectorAll("h2")].map((element) => element.textContent)
    ).toStrictEqual(["Movie 1", "Movie 2"]);
    expect(
      [...document.querySelectorAll(".short-info-genre-list")].map(
        (element) => element.textContent
      )
    ).toStrictEqual(["2022 · Action, Adventure", "2021 · Action, Horror"]);
  });

  it("searches for movies", async function () {
    m.movieService.fetchMovies = jest.fn(() =>
      Promise.resolve({
        results: [
          { original_title: "Search movie 1" },
          { original_title: "Search movie 2" },
        ],
      })
    );
    expect(m.movieService.fetchMovies).toHaveBeenCalledTimes(0);

    document.getElementById("search-input").value = "smile";
    document.getElementById("search-input").dispatchEvent(new Event("input"));

    expect(m.movieService.fetchMovies).toHaveBeenCalledTimes(0);

    await new Promise((r) => setTimeout(r, 700));

    expect(m.movieService.fetchMovies).toHaveBeenCalledTimes(1);
    expect(m.movieService.fetchMovies).toHaveBeenCalledWith("smile", 1);
    expect(
      [...document.querySelectorAll("h2")].map((element) => element.textContent)
    ).toStrictEqual(["Search movie 1", "Search movie 2"]);
  });
});
