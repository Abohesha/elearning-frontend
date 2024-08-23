import React from 'react';

const StarRating = ({ rating, onRatingChange }) => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          onClick={() => onRatingChange && onRatingChange(index + 1)}
          style={{ cursor: onRatingChange ? 'pointer' : 'default', color: index < rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
