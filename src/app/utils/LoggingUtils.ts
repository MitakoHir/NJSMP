import { Request, Response } from 'express';
export function ErrorLogger(err: Error, req: Request, res: Response) {
    res.status(500).json(err.message);
}
