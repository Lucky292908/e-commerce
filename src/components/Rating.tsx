// Rating.tsx

import React from 'react';
import './Rating.css';

interface RatingProps {
  rating?: number; // Rating value (optional)
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  if (rating === undefined) {
    return null; // Handle case where rating is undefined (or render a placeholder)
  }

  const getStarColor = (): string => {
    if (rating >= 4.5) {
      return 'high-rating'; // Green color for high ratings
    } else if (rating >= 3.5) {
      return 'filled'; // Default gold color for medium ratings
    } else {
      return 'low-rating'; // Red color for low ratings
    }
  };

  const renderStars = (): JSX.Element[] => {
    const stars = [];
    const numStars = 5; // Total number of stars

    for (let i = 0; i < numStars; i++) {
      if (i < Math.floor(rating)) {
        // Full star
        stars.push(<span key={i} className={`rating-icon ${getStarColor()}`}>&#9733;</span>);
      } else {
        // Empty star
        stars.push(<span key={i} className="rating-icon">&#9734;</span>);
      }
    }

    return stars;
  };

  return (
    <div className="rating tooltip">
      <div className="rating-container">{renderStars()}</div>
      <span className="tooltiptext">Rating: {rating}</span>
    </div>
  );
};

export default Rating;
