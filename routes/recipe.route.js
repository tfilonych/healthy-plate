const { Router } = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth.middleware');
const router = Router();
const multer = require('multer');

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
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});


router.post(
'/save',
  upload.single('image'),
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
    res.status(500).json({ message: 'Something went wrong. Please, try again' });
  }
})

router.get('/all', async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    res.json(recipes);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please, try again !!!!' });
  }
})
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById({_id: req.params.id});

    res.json(recipe);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please, try again !!!!' });
  }
});


module.exports = router;