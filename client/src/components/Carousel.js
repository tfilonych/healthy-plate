import React, { useEffect, useState } from 'react';
import CarouselItem from './CarouselItem';

const Carousel = () => {
  const images = [
    '/public/images/slider-1.jpg',
    '/public/images/slider-2.jpeg',
    '/public/images/slider-3.jpg',
    '/public/images/slider-4.jpg'
  ];
  const texts = [
    `<span>Healthy foods</span> are those that provide you with the nutrients you need to sustain your body's well-being and retain energy.`,
    `Foods marketed as <span>health foods</span> may be part of one or more categories, such as natural foods, 
    organic foods, whole foods, vegetarian foods or dietary supplements.`,
    `<span>The Healthy Eating Pyramid</span> is a simple visual guide to the types and proportion of foods that we should eat every day for good health.`,
    'Vegetables, fruit, whole grains, healthy oils, and healthy proteins like nuts, beans, fish, and chicken should make it into the <span>shopping cart</span> every week'
  ];
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [5000]);

  const prevSlide = () => {
    setActiveItem((prevItem) => (prevItem > 0 ? prevItem - 1 : 0));
  };

  const nextSlide = () => {
    setActiveItem((prevItem) => (prevItem === images.length - 1 ? 0 : prevItem + 1));
  };
  return (
    <>
      <div className='text' dangerouslySetInnerHTML={{ __html: texts[activeItem] }}></div>
      <div className='carousel'>
        <div className='carousel-inner'>
          {images.map((image, index) => {
            return (
              <CarouselItem imageSrc={image} key={index} isActive={index === activeItem} />
            );
          })}
        </div>
        <button className='left' onClick={prevSlide} />
        <button className='right' onClick={nextSlide} />
      </div>
    </>
  );
};

export default Carousel;
