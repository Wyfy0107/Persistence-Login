import express, { Response, Request, NextFunction } from 'express';

import authRouter from './routers/auth';
import strategy from './config/passport';
import passport from 'passport';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
passport.use(strategy.local);
passport.use(strategy.jwt);

app.use('/api/auth', authRouter);

app.listen(5000);
