import { movieService } from "../../shared/services/movie.service.js";

/**
 * Creates a movie media div element
 * @function media
 */
export const media = function (movie) {
  const media = document.createElement("div");
  media.className = "media-row";

  const mediaTitle = document.createElement("h3");
  mediaTitle.append("Media");
  media.appendChild(mediaTitle);

  const trailerContainer = document.createElement("div");
  trailerContainer.className = "media-container";
  media.appendChild(trailerContainer);

  const trailer = document.createElement("iframe");
  trailer.className = "media";
  trailer.allowFullscreen = true;
  trailerContainer.appendChild(trailer);

  // Fetch the related videos and try to find the best match
  movieService.fetchVideos(movie.id).then((res) => {
    const trailers = res.filter((v) => v.type === "Trailer");
    let target = trailers.find((v) => v.name === "Official Trailer")?.key;
    if (!target) {
      target = trailers.find((v) => v.name.includes("Official Trailer"))?.key;
    }
    if (!target) {
      target = trailers[0]?.key;
    }
    if (!target) {
      target = res[0]?.key;
    }
    if (target) {
      trailer.src = `https://www.youtube.com/embed/${target}`;
    } else {
      media.remove();
    }
  });

  return media;
};
