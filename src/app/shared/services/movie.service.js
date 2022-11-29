import { apiService } from "./api.service.js";
import { referenceService } from "./reference.service.js";

/**
 * Movie related apis
 * @namespace movieService
 */
export const movieService = (function () {
  /**
   * Fetches genres and stores the result in {@link referenceService}
   * @function
   * @alias movieService.fetchGenres
   * @returns {Promise<Array>} A promise of genres
   */
  function fetchGenres() {
    return fetch(`${apiService.baseUrl}genre/movie/list${apiService.key}`)
      .then((res) => res.json())
      .then((res) => (referenceService.genres = res.genres));
  }

  /**
   * Fetches movies based on the search input parameter
   * @function
   * @alias movieService.fetchMovies
   * @param {Number} search A search string. If none is provided, the now playing movies will be returned
   * @param {Number} page Each page consists of 20 records
   * @returns {Promise<object>} A promise of movie search results or now playing movies
   */
  function fetchMovies(search, page) {
    return fetch(
      `${apiService.baseUrl}${search ? "search/movie" : "movie/now_playing"}${
        apiService.key
      }&language=en-US&page=${page}${search ? `&query=${search}` : ""}`
    ).then((res) => res.json());
  }

  /**
   * Fetches related videos by movie id
   * @function
   * @alias movieService.fetchVideos
   * @param {Number} movieId The movie identifier
   * @returns {Promise<Array>} A promise of related videos
   */
  function fetchVideos(movieId) {
    return fetch(
      `${apiService.baseUrl}movie/${movieId}/videos${apiService.key}`
    )
      .then((res) => res.json())
      .then((res) => res.results);
  }

  /**
   * Fetches related reviews by movie id
   * @function
   * @alias movieService.fetchReviews
   * @param {Number} movieId The movie identifier
   * @returns {Promise<Array>} A promise of related reviews
   */
  function fetchReviews(movieId) {
    return fetch(
      `${apiService.baseUrl}movie/${movieId}/reviews${apiService.key}`
    )
      .then((res) => res.json())
      .then((res) => res.results);
  }

  /**
   * Fetches similar movies by movie id
   * @function
   * @alias movieService.fetchSimilar
   * @param {Number} movieId The movie identifier
   * @returns {Promise<Array>} A promise of similar movies
   */
  function fetchSimilar(movieId) {
    return fetch(
      `${apiService.baseUrl}movie/${movieId}/similar${apiService.key}`
    )
      .then((res) => res.json())
      .then((res) => res.results);
  }

  return {
    fetchGenres,
    fetchMovies,
    fetchReviews,
    fetchSimilar,
    fetchVideos,
  };
})();
