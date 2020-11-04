import express from 'express';
import passport from 'passport';

import { test, post, register, login, getUserData } from '../controllers/auth';

const router = express.Router();

router.get('/', test);
router.post('/post', post);
router.post('/register', register);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);
router.get(
  '/user/data',
  passport.authenticate('jwt', { session: false }),
  getUserData
);

export default router;
