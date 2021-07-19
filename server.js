import express, {json} from 'express';
import cors from 'cors';
import usersRouter from './router/users-routes.js';
import authRouter from './router/auth-routes.js';
import postsRouter from './router/posts-routes.js';
import commentsRouter from './router/comments_routes.js';
import likesRouter from './router/likes_routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4040;
const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api/auth',authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/likes', likesRouter);


app.listen(PORT, ()=> {
  console.log(`Starting Server on port:${PORT}`);
})