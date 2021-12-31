import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";

Rate.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#DCDCDC",
  },
};

function Rate(props) {
  const { count, rating, color, onRating, disabled } = props;
  const [hoverRating, setHoverRating] = useState(0);
  const getColor = (index) => {
    if (hoverRating >= index) return color.filled;
    else if (!hoverRating && rating >= index) return color.filled;
    return color.unfilled;
  };
  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map(
        (idx) => {
          return (
            <FontAwesomeIcon
              aria-disabled={disabled}
              key={idx}
              icon={faStar}
              transform="shrink-6"
              size="4x"
              style={{ color: getColor(idx), cursor: "pointer" }}
              onClick={() => onRating(idx)}
              onMouseEnter={() => setHoverRating(idx)}
              onMouseLeave={() => setHoverRating(0)}
            />
          );
        },
        [count, rating, hoverRating]
      );
  });
  return <div>{starRating} </div>;
}

export default Rate;
