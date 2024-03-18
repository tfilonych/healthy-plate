import Router from 'express';
import Recipe from '../models/Recipe';
import auth from '../middleware/auth.middleware';
import multer from 'multer';
import dbConnect from './../db';
import { S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { Upload } from '@aws-sdk/lib-storage';
//import fs from 'fs';
// import { Upload } = require("@aws-sdk/lib-storage");
const accessKeyId = 'AKIATCKATCWDBQ65FTQF';
const secretAccessKey = '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';
const region = 'eu-central-1';
const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  region
});
const AWS_BUCKET_NAME = 'healthy-plate';
const router = Router();
const uploadFileToS3 = async (file) => {
  const fileStream = new Readable({
    read() {
      this.push(file.data);
      this.push(null); // Signal the end of the stream
    }
  });
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: AWS_BUCKET_NAME,
      Key: file.filename,
      Body: fileStream
    }
  });


  // const uploadParams = {
  //   Bucket: AWS_BUCKET_NAME,
  //   Body: fileStream,
  //   Key: file.filename
  // };

  try {
    // Execute the upload operation
    const result = await upload.done();
    console.log('File uploaded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  //return s3.upload(uploadParams).promise();
};

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
      await dbConnect();
      const { title, ingredients, procedures } = req.body;
      const existing = await Recipe.findOne({ title });

      console.log('file is ');
      console.log(req.file);
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
  '/all',
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