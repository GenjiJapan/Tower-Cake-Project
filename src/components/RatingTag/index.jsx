import StarRatings from "components/StarRating/star-rating";
import React from "react";

function RatingTag(props) {
  const { rating } = props;

  if (!rating) return <div></div>;
  return (
    <div>
      <StarRatings
        svgIconViewBox="0 0 51 48"
        starRatedColor="#fdd43c"
        starEmptyColor="#fff"
        rating={rating}
        starSpacing="17px"
      />
    </div>
  );
}

export default RatingTag;
