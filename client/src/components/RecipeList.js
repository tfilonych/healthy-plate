import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../images/default-image.jpg';

const RecipeList = ({ recipes=[] }) => {
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  }
  const hardcodedArr = [
    {
      "_id": "60303de112297a31d205f7d5",
      "title": "Buttermilk Pancakes with Maple Syrup Apples",
      "procedures": "Mix together the salad leaves, shredded lettuce, plum tomatoes and sun blush tomatoes. Share between 4 plates.",
      "date": "2021-02-19T22:38:25.717Z",
      "owner": "602288b95e47e048b0d43700",
      "__v": 0,
      "id": "1"
    },
    {
      "ingredients": [
        ""
      ],
      "_id": "6043f7f53af55dd42cf3fff8",
      "title": "test12",
      "procedures": "",
      "date": "2021-03-06T21:45:25.436Z",
      "image": "images/1614815492627_pexels-photo-6507010.jpeg",
      "__v": 0
    },
    {
      "ingredients": [
        "Where can I get some?,Where can I get some?,Where can I get some?,Where can I get some?"
      ],
      "_id": "60402110a74a00a8c6937c39",
      "title": "Added eligibility object logic with feature flags",
      "procedures": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
      "date": "2021-03-03T23:51:44.301Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614815497335_pexels-photo-6507010.jpeg",
      "__v": 0
    },
    {
      "ingredients": [
        "2 cups all-purpose flour",
        "3 tablespoons granulated sugar",
        "2 teaspoons baking powder",
        "6 tablespoons cold, unsalted butter, cut into small pieces",
        "3/4 cup cold half & half",
        "1 teaspoon pure vanilla extract",
        "4 ounces fresh blueberries"
      ],
      "_id": "60319e7f7651bd413c3269d0",
      "title": "Blueberry Scones with Frosting",
      "procedures": "Line a baking sheet with parchment paper.\nTo a large bowl add the flour, sugar, baking powder, salt and lemon zest, and whisk to combine.\nAdd in the cold butter, and using a fork, a pastry cutter or knives (I actually use my fingers), cut the butter into the dry ingredients until it resembles a pea-size crumble.\nDrizzle in the cold half & half, along with the vanilla, and add in the blueberries; using a spatula, fold the liquid and blueberries into the dry ingredients just until everything is incorporated (take care not to over mix).\nTurn the dough out onto a lightly floured work surface (it may be slightly sticky and crumbly), gather it up, and pat into disc about 1/2 – 3/4 ” thick; cut into 8 scones, place onto the prepared baking sheet, and chill in the fridge for 15 minutes.\nPreheat the oven to 425.\nPrepare the buttermilk glaze by whisking together all of the ingredients in a bowl until smooth, thick, and creamy; set aside.\nBrush the tops of the scones with the remaining 1-2 tablespoons of half & half, then bake them for 18 minutes, or until golden-brown; allow them to cool slightly, then drizzle with the glaze, and allow that to set for a few minutes.\n",
      "date": "2021-02-20T23:42:55.638Z",
      "owner": "602288b95e47e048b0d43700",
      "__v": 0,
      "image": "images/1615067044227_06edec8a20b8.jpg",
      "id": "2"
    },
    {
      "ingredients": [
        "Where can I get some?,Where can I get some?"
      ],
      "_id": "6043fcd0ba71c6001c3c99d2",
      "title": "test2",
      "procedures": "test2",
      "date": "2021-03-06T22:06:08.106Z",
      "image": "images/1615068356503_06edec8a20b8.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "Why do we use it?,Where does it come from?,Where can I get some?"
      ],
      "_id": "60401055ced219a3d979602e",
      "title": "What is Lorem Ipsum?",
      "procedures": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "date": "2021-03-03T22:40:21.280Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614811220296_Baby+food.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf3524f8789c2b8830a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614794549104_baby-eat.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf3524f789c2b88301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614794549104_baby-eat.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf3524f879c2b88301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614794549104_baby-eat.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf324f8789c2b88301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614794549104_baby-eat.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf3524f789c2b8301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614794549104_baby-eat.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "60fcf3524f8789c2b88301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614791651253_images.jpeg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf324f8789c2b8301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614791806216_images.jpeg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf3524f8789c2b8301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614792128400_images.jpeg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf3524f8789c2b8801a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614794549104_baby-eat.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fc324f8789c2b88301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614811220296_Baby+food.jpg",
      "__v": 0
    },
    {
      "ingredients": [
        "yhtgrfe"
      ],
      "_id": "603fcf3524f8789c2b88301a",
      "title": "hgbfvdcs",
      "procedures": "jyhtre",
      "date": "2021-03-03T18:02:29.239Z",
      "owner": "602288b95e47e048b0d43700",
      "image": "images/1614815204139_storingbabyfoods.jpg",
      "__v": 0
    }
  ]

  return (
    <>
      {recipes.map((recipe, index) => {
          return (
            <Link className="recipe flip-container" key={recipe._id} to={`/recipes/${recipe._id}`}>
                <div className="txt-container">
                  <div className="title">{recipe.title}</div>
                  &#9918;
                  <div className="cook-item">15m</div>
                </div>
                <div className="image-container">
                  <img
                      src={recipe.image ? recipe.image : defaultImage}
                      onError={handleImageError}
                      alt={recipe.title}
                      loading="lazy"
                  />
                </div>
            </Link>
          );
        })}
    </>
  )
}

export default RecipeList;