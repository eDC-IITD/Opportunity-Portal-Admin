import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import { authenticationMiddleware } from './authentication';
import { mongoConnector } from './database';
import { jobRouter } from './routes/job';
import { authRouter } from './routes/auth';
import { studentRouter } from './routes/student';
import { CONFIG } from './config';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
// TODO: https://repost.aws/knowledge-center/elastic-beanstalk-nginx-configuration
app.use(express.urlencoded({ extended: true })); // TODO

app.use('/auth', authRouter);
app.use(authenticationMiddleware);
app.use('/job', jobRouter);
app.use('/student', studentRouter);

mongoConnector.connect(CONFIG.DATABASE_URL);

const PORT = CONFIG.PORT;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
