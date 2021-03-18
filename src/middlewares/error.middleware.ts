import { Response, Request } from 'express';
import { General } from '../utils';

/**
 * 
 * @param {General} error Error from the class General
 * @param {Request} _re Request from express controllers
 * @param {Response} res Response from express controllers
 */
export function errorMiddleware(error: General, _re: Request, res: Response): void {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(status).json({ status,message });
}