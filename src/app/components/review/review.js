import { movieService } from "../../shared/services/movie.service.js";
import { referenceService } from "../../shared/services/reference.service.js";

/**
 * Creates a review div element
 * @function review
 */
export const review = function (movie) {
  const reviewRow = document.createElement("div");
  reviewRow.className = "review-row";
  const reviewsTitle = document.createElement("h3");
  reviewsTitle.append("Reviews");
  reviewRow.appendChild(reviewsTitle);

  // Fetch related reviews
  // If none exists, append an empty placeholder
  movieService.fetchReviews(movie.id).then((res) => {
    if (res.length !== 0) {
      res.slice(0, 2).forEach((r) => {
        reviewRow.appendChild(createReviewCard(r));
      });
    } else {
      const emptyReview = document.createElement("span");
      emptyReview.className = "review-empty";
      emptyReview.append("No reviews yet. Be the first to write one.");
      reviewRow.append(emptyReview);
    }
  });

  // Each review card consists of a title (avatar, author, rating),
  // the date of the review and the content of the review
  function createReviewCard(review) {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";
    const titleRow = document.createElement("div");
    titleRow.className = "review-title";
    const avatar = document.createElement("img");
    avatar.className = "review-avatar";
    avatar.alt = review.author;
    avatar.onerror = function () {
      this.src = "/assets/empty-avatar.jpg";
      this.classList.add("empty-avatar");
    };
    avatar.src = `${referenceService.configuration.images.secure_base_url}w45${review.author_details.avatar_path}`;
    const starRating = document.createElement("img");
    starRating.className = "review-star";
    starRating.alt = "rating";
    starRating.src = "/assets/star.png";
    const rating = document.createTextNode(review.author_details.rating);
    const author = document.createElement("span");
    author.className = "review-author";
    author.append(review.author);
    titleRow.append(avatar, author, starRating, rating);
    reviewCard.append(titleRow);

    const reviewDate = document.createElement("span");
    reviewDate.className = "review-date";
    reviewDate.append(
      new Date(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    reviewCard.append(reviewDate);

    const contentRow = document.createElement("p");
    contentRow.className = "review-content";
    contentRow.append(review.content);
    reviewCard.append(contentRow);

    return reviewCard;
  }

  return reviewRow;
};
