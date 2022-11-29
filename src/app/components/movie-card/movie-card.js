import { referenceService } from "../../shared/services/reference.service.js";
import { additionalInfo } from "../additional-info/additional-info.js";
import { shortInfo } from "../short-info/short-info.js";

/**
 * Creates a movie card div element.
 * Consists of a poster and a short info section as default.
 * On click, it appends an additional info section if not already present.
 * @function movieCard
 */
export const movieCard = function (movie) {
  const card = document.createElement("div");
  card.className = "card";
  const snapshot = document.createElement("div");
  snapshot.className = "card-snapshot";
  snapshot.append(poster(), shortInfo(movie));
  snapshot.addEventListener("click", toggleMovie);
  card.appendChild(snapshot);

  function poster() {
    const posterContainer = document.createElement("div");
    posterContainer.className = "card-poster-container";
    const poster = document.createElement("img");
    poster.alt = movie.original_title;
    poster.className = "card-poster";
    poster.loading = "lazy";
    poster.onerror = function () {
      this.src = "/assets/empty-poster.png";
      this.classList.add("empty-poster");
    };
    poster.src = `${referenceService.configuration.images.secure_base_url}w185${movie.poster_path}`;
    posterContainer.appendChild(poster);
    return posterContainer;
  }

  function toggleMovie() {
    if (!this.nextSibling) {
      this.parentNode.appendChild(additionalInfo(movie));
    }
    this.parentNode.classList.toggle("active");
  }

  return card;
};
