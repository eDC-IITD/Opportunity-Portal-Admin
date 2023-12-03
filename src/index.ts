import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import { authenticationMiddleware } from './authentication';
import { mongoConnecter } from './database';
import { job_router } from './routes/job';
import { auth_router } from './routes/auth';
import { student_router } from './routes/student';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true })); // TODO
app.use('/auth', auth_router);
app.use(authenticationMiddleware);
app.use('/job', job_router);
app.use('/student', student_router);
mongoConnecter.connect(process.env.DATABASE_URL || '');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
