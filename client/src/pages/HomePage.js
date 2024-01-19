import React from 'react';
import Carousel from '../components/Carousel';
import Divider from '../components/Divider';

const HomePage = () => {
  return (
    <div className='home-page'>
      <Carousel />
      <Divider />
      <article>
        <section>
          <div className='image-container'>
            <img src='/../public/images/home-second-section.webp' alt='' />
          </div>
          <div className='text-container'>
            <h2>What is Considered “Healthy Food”?</h2>
            <p>Healthy foods are those that provide you with the nutrients you need to sustain your body’s
              well-being and retain energy. Water, carbohydrates, fat, protein, vitamins, and minerals
              are the key nutrients that make up a healthy, balanced diet.
            </p>
          </div>
        </section>
        <Divider />
        <section>
          <div className='text-container'>
            <h2>Reimagining Healthy Eating Amidst Cultural Influences</h2>
            <p>Diet culture, social media, unrealistic body standards and the normalisation of disordered
              eating have all sadly combined to skew a lot of people’s idea of what ‘healthy’ eating really
              means.
            </p>
          </div>
          <div className='image-container'>
            <img src='/../public/images/home-third-section.jpeg' alt='' />
          </div>
        </section>
        <Divider />
        <section>
          <div className='image-container'>
            <img src='/../public/images/home-fourth-section.jpg' alt='' />
          </div>
          <div className='text-container'>
            <h2>Breaking the Cycle: Beyond Calorie Counting and Quick Fixes for True Health</h2>
            <p>Quite often their mind goes immediately to calories, carbs and deprivation. The countless
              articles promising to ‘cut belly fat in just three days!’ and ‘lose a dress-size in a week!’
              have nothing to do with health, and the sooner we realise health and looks don’t go hand in hand,
              the better off we’ll be.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
};

export default HomePage;
