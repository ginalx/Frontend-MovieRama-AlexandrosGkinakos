import { referenceService } from "../../shared/services/reference.service.js";

/**
 * Creates a movie short info div element.
 * Consists of a title, year with genre list, rating and overview.
 * @function shortInfo
 */
export const shortInfo = function (movie) {
  const shortInfo = document.createElement("div");
  shortInfo.className = "short-info";
  shortInfo.append(title(), yearAndGenreRow(), rating(), overview());

  function title() {
    const title = document.createElement("h2");
    title.append(movie.original_title);
    return title;
  }

  function yearAndGenreRow() {
    const genreList = document.createElement("span");
    genreList.className = "short-info-genre-list";
    if (movie.release_date) {
      genreList.append(`${new Date(movie.release_date).getFullYear()}`);
    }
    if (movie.genre_ids && movie.genre_ids.length !== 0) {
      genreList.append(
        ` · ${referenceService.genres
          .filter((g) => movie.genre_ids.includes(g.id))
          .map((g) => g.name)
          .join(", ")}`
      );
    }
    return genreList;
  }

  function rating() {
    const ratingRow = document.createElement("p");
    ratingRow.className = "short-info-rating";
    const star = document.createElement("img");
    star.className = "short-info-star";
    star.alt = "rating";
    star.src = "/assets/star.png";
    ratingRow.append(
      star,
      `${movie.vote_count === 0 ? "-" : movie.vote_average}`
    );
    return ratingRow;
  }

  function overview() {
    const overview = document.createElement("p");
    overview.className = "short-info-overview";
    overview.append(movie.overview);
    return overview;
  }

  return shortInfo;
};
