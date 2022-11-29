import { configurationService } from "./shared/services/configuration.service.js";
import { movieService } from "./shared/services/movie.service.js";
import { movieCard } from "./components/movie-card/movie-card.js";

/**
 * Controls the behaviour of index.html
 * @module index
 */
export const index = (function () {
  let page = 1;
  let throttleScroll = false;
  let timeoutId;
  let movieListElement;
  let pageTitleElement;
  let searchValue = "";

  const searchDebounce = 600;
  const infiniteScrollOffset = 1300;

  window.addEventListener("beforeunload", scrollTop);

  movieListElement = document.getElementById("movie-list");
  pageTitleElement = document.getElementById("page-title");
  document.getElementById("search-input").addEventListener("input", search);

  Promise.all([
    configurationService.fetchConfiguration(),
    movieService.fetchGenres(),
    movieService.fetchMovies("", page).then(addRemoveInfiniteScroll),
  ]).then(([, , res]) => addMoviesToList(res));

  function addMoviesToList(res) {
    movieListElement.append(...res.results.map(movieCard));
  }

  function scrollTop() {
    window.scrollTo({ top: 0 });
  }

  function handleScroll() {
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - infiniteScrollOffset &&
      !throttleScroll
    ) {
      throttleScroll = true;

      movieService
        .fetchMovies(searchValue, (page += 1))
        .then(addRemoveInfiniteScroll)
        .then(addMoviesToList)
        .then(() => (throttleScroll = false));
    }
  }

  function addRemoveInfiniteScroll(res) {
    if (page === res.total_pages) {
      window.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }
    return res;
  }

  function search(event) {
    const value = event.target.value;
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      throttleScroll = true;
      pageTitleElement.textContent = `${
        value ? `Movie search results for "${value}"` : "Now playing movies"
      }`;
      scrollTop();
      movieListElement.replaceChildren();
      movieService
        .fetchMovies((searchValue = value), (page = 1))
        .then(addRemoveInfiniteScroll)
        .then(addMoviesToList)
        .then(() => (throttleScroll = false));
    }, searchDebounce);
  }
})();
