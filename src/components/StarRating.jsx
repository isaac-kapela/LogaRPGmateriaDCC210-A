export default function StarRating({ rating = 0, reviewCount, showCount = true }) {
  const rounded = Math.round(rating);
  const stars = [0, 1, 2, 3, 4].map((i) =>
    i < rounded ? (
      <span key={i} aria-hidden="true">★</span>
    ) : (
      <span key={i} className="star-empty" aria-hidden="true">★</span>
    )
  );

  return (
    <div className="product-rating">
      <span className="stars" aria-label={`Avaliação ${rating} de 5`}>
        {stars}
      </span>
      {showCount && reviewCount != null && (
        <span className="rating-count">({reviewCount})</span>
      )}
    </div>
  );
}
