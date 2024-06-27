import React from 'react';

const CarouselItem = ({ imageSrc, isActive }) => {
  return (
    <div className={`carousel-item ${isActive && 'visible'}`}>
      <img src={imageSrc} alt='' />
    </div>
  );
};

export default CarouselItem;
