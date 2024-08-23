import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (index) => {
    if (onRatingChange) {
      onRatingChange(index + 1); 
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={`star ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          onClick={() => handleClick(index)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
