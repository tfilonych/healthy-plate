import Router from 'express';
import Recipe from '../models/Recipe';
import auth from '../middleware/auth.middleware';
import multer from 'multer';
import dbConnect from './../db';
import fs from 'fs';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const router = Router();
const accessKeyId = 'AKIATCKATCWDBQ65FTQF';
const secretAccessKey = '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';
const AWS_BUCKET_NAME = 'healthy-plate';
const region = 'eu-central-1';

// test for S3 'file save' functionality
const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  region
});
const uploadFileToS3 = async (file) => {
  try {
    // Read the file data
    const fileData = fs.readFileSync(file.path);
    // Prepare parameters for uploading to S3
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.filename,
      Body: fileData // Use file data read from the file
    };
    // Upload file to S3
    return await s3.send(new PutObjectCommand(params));
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './imageStore');
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
  '/',
  upload.single('file'),
  auth,
  async (req, res) => {
    try {
      await dbConnect();
      const { title, ingredients, procedures } = req.body;
      const existing = await Recipe.findOne({ title });
      await uploadFileToS3(req.file);

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
  });

router.get(
  '/',
  async (req, res) => {
    await dbConnect();
    try {
      const recipes = await Recipe.find({});

      res.json(recipes);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Please, try again !!!!' });
    }
  });
router.get(
  '/:id',
  async (req, res) => {
    try {
      await dbConnect();
      const recipe = await Recipe.findById({ _id: req.params.id });
      res.json(recipe);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong. Please, try again !!!!' });
    }
  });

export default router;