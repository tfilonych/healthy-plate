const Router = require('express');
const router = new Router();
import authRouter from './auth.route';
import linkRouter from './link.route';
import recipeRouter from './recipe.route';

router.use('/auth', authRouter);
router.use('/link', linkRouter);
router.use('/recipe', recipeRouter);

export default router;