import express from 'express';
import cors from 'cors';

import { errorHandler } from './error/errorHandler';

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use('/api/notes', notesRoutes);
    // app.use('/api/auth', authRoutes);

    app.use(errorHandler);

    return app;
}