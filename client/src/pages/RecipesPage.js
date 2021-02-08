import React from 'react';

const RecipesPage = () => {
  const recipes = {
    title: "Some title",
    description:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
       sed do eiusmod tempor incididunt ut labore et dolore magna 
       aliqua. Ut enim ad minim veniam, quis nostrud exercitation
       ullamco laboris nisi ut aliquip ex ea commodo consequat.`
  };
  const items = [...Array(10)].map((_, i) => recipes);

  return (
    <div className="recipes">
      {items.map((i, index) => {
        return (
          <div className="recipe" key={index}>
            {/*<div className="img" />*/}
            <img
              src="https://i0.wp.com/demo.wpzoom.com/gourmand/files/2019/04/gourmand14.jpg?resize=380%2C520&ssl=1"
              alt="recipe"
            />
            <div className="txt-container">
              <div className="title">{i.title}</div>
              <div className="description">{i.description}</div>
              <div className="more-btn">More</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipesPage;
