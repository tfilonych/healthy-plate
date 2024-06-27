import Router from 'express';
import authRouter from './auth.route';
import linkRouter from './link.route';
import recipeRouter from './recipe.route';

const router = new Router();
router.use('/auth', authRouter);
router.use('/links', linkRouter);
router.use('/recipes', recipeRouter);

export default router;