const { Router } = require('express');
const mongoose = require('mongoose')
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require('multer');
const config = require('config');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './images');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, webp, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


router.post(
'/save',
  upload.single('file'),
  auth,
  async (req, res) => {
  try {
    const { title, ingredients, procedures } = req.body;
    const existing = await Recipe.findOne({ title });

    if (existing) {
      return res.json({ recipe: existing });
    }

    const recipe = new Recipe({
      title,
      ingredients,
      procedures,
      date: Date.now(),
      owner: req.user.userId,
      image: req.file.path
    });

    await recipe.save();

    res.status(201).json({ recipe });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
})

router.get('/all', async (req, res) => {
  console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY')
  try {

    // if (mongoose.connection.readyState !== 1) {
    //   // Mongoose is not connected
    //   throw new Error('Mongoose is not connected to the database');
    // }

    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true

    });
      const recipes = await Recipe.find({})
        console.log('hello from try section!!!!!')
        console.log(recipes)

        res.json(recipes);
  } catch (e) {
    console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY errrrrrrrr')
    console.log(e)
    res.status(500).json({ message: 'Something went wrong. Please, try again !!!!' });
  }
})
router.get('/:id', async (req, res) => {
  console.log(1111111111111111111111111111111111)
  try {
    const recipe = await Recipe.findById({_id: req.params.id});

    res.json(recipe);
  } catch (e) {
    res.status(500).json({message: 'Something went wrong. Please, try again !!!!'});
  }
});

router.get('/test/one', async (req, res) => {
  console.log(1111111111111111111111111111111111)
    try {
      res.json({j: "jiuhu"})

    } catch (e) {
      res.status(500).json({ message: 'Somet!!!!' });
    }

});


module.exports = router;