import { Request, NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserDAO } from '../../data-access/UserDAO';

interface Payload {
    login: string;
    password: string;
}

export async function Auth(req: Request, res: Response, next: NextFunction) {
    let token = req.header('Authorization');
    if (!token) {
        res.status(401).json('No token provided');
    }
    token = token.replace('Bearer ', '');
    try {
        const data: Payload = jwt.verify(token, process.env.SECRET_KEY) as Payload;
        const userRecord = await UserDAO.findByLogin(data.login);
        if (!userRecord || userRecord.token !== token || userRecord.password !== data.password) {
            throw new Error('Invalid token provided');
        }
        next();
    } catch (e) {
        res.status(403).json({
            name: e.name,
            message: e.message,
            expiredAt: e.expiredAt,
        });
    }
}
