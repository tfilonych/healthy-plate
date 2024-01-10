import Router from 'express';
import Recipe from '../models/Recipe';
import auth from '../middleware/auth.middleware';
import multer from 'multer';
import dbConnect from './../db';

const router = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      console.log('from destination !!!!!!')
      console.log(file)
      cb(null, './images');
    },
    filename(req, file, cb) {
      console.log('from filename !!!!!!')
      console.log(file)
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
  console.log('After file upload')
  try {
    await dbConnect();
    const { title, ingredients, procedures } = req.body;
    console.log('request body is !!!!!')
    console.log(req.body)
    console.log('request file is')
    console.log(req.file)
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
    console.log('inside catch !!!')
    console.log(e)
    res.status(500).json({ message: e.message });
  }
})

router.get(
    '/all',
    async (req, res) => {
      await dbConnect();
      try {
        const recipes = await Recipe.find({});

        res.json(recipes);
      } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Please, try again !!!!' });
      }
})
router.get(
    '/:id',
    async (req, res) => {
      try {
        await dbConnect();
        const recipe = await Recipe.findById({_id: req.params.id});
        res.json(recipe);
      } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Please, try again !!!!' });
      }
});

export default router;