import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from './AppError';

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isKnown = err instanceof AppError;

    const status = isKnown ? err.statusCode : 500;
    const message = isKnown ? err.message : 'Internal server error';

    console.error(`[ERROR] ${req.method} ${req.path} → ${message}`);

    res.status(status).json({ error: message });
};