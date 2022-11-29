import { media } from "../media/media.js";
import { similar } from "../similar/similar.js";
import { review } from "../review/review.js";

/**
 * Creates an additional movie info div element.
 * Contains a media, review and similar row.
 * @function additionalInfo
 */
export const additionalInfo = function (movie) {
  let additionalInfo = document.createElement("div");
  additionalInfo.className = "additional-info";
  additionalInfo.append(media(movie), review(movie), similar(movie));

  return additionalInfo;
};
