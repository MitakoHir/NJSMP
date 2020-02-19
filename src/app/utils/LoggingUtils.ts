import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

const errorLoggerInst = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: {service: 'Controller-logger'},
    transports: [
        new winston
            .transports
            .Console({consoleWarnLevels: ['error', 'warn'], format: winston.format.json()}),
    ],
});

const routeLoggerInst = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: {service: 'Route-logger'},
    transports: [
        new winston
            .transports
            .Console({format: winston.format.json()}),
    ],
});


export function errorLogger(err: Error, req: Request, res: Response, next: NextFunction) {
    errorLoggerInst.error('Unhandled error in controller', {
        errorMessage: err.message,
        stacktrace: err.stack,
    });
    next(`Ooops, there is an unhandled error: ${err.message}`);
}

export function routeLogger(req: Request, res: Response, next: NextFunction) {
    const {method, params, body, route: {path}, baseUrl} = req;
    routeLoggerInst.debug('Route debug logger', {
        baseUrl,
        path,
        method,
        params,
        body,
    });
    next();
}
