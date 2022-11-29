import { movieService } from "../../shared/services/movie.service.js";
import { referenceService } from "../../shared/services/reference.service.js";

/**
 * Creates similar movies div element
 * @function similar
 */
export const similar = function (movie) {
  const similarRow = document.createElement("div");
  similarRow.className = "similar-row";
  const similarTitle = document.createElement("h3");
  similarTitle.append("More like this");
  similarRow.appendChild(similarTitle);
  const similar = document.createElement("div");
  similar.className = "similar";
  similarRow.appendChild(similar);

  // Fetch similar movies and add them
  // If not similar movies exist, remove this entire element
  movieService.fetchSimilar(movie.id).then((res) => {
    const target = res.slice(0, 5);
    if (target.length !== 0) {
      target.forEach((s) => {
        similar.appendChild(similarMovie(s));
      });
    } else {
      similarRow.remove();
    }
  });

  function similarMovie(movie) {
    const similarContainer = document.createElement("div");
    similarContainer.className = "similar-container";
    const similarImage = document.createElement("img");
    similarImage.className = "similar-card";
    similarImage.alt = movie.original_title;
    similarImage.src = `${referenceService.configuration.images.secure_base_url}w185${movie.poster_path}`;
    const similarTitle = document.createElement("p");
    similarTitle.className = "similar-title";
    similarTitle.append(movie.original_title);
    similarContainer.appendChild(similarImage);
    similarContainer.append(similarTitle);
    return similarContainer;
  }

  return similarRow;
};
