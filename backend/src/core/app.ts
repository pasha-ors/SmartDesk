import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import { errorHandler } from './error/errorHandler';

export function createApp() {

    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors());
    app.use(errorHandler);

    // app.use('/api/notes', notesRoutes);
    // app.use('/api/auth', authRoutes);

    return app;
}