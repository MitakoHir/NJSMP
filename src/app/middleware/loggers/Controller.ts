import { NextFunction, Request, Response } from 'express';
import { controllerErrorLogger, routeDebugLogger } from '../../utils/Loggers';

export function controllerError(err: Error, req: Request, res: Response, next: NextFunction) {
    controllerErrorLogger.error('Unhandled error in controller', {
        errorMessage: err.message,
        stacktrace: err.stack,
    });
    next(`Ooops, there is an unhandled error: ${err.message}`);
}

export function routeDebug(req: Request, res: Response, next: NextFunction) {
    const {method, params, body, route: {path}, baseUrl} = req;
    routeDebugLogger.debug('Route debug logger', {
        baseUrl,
        path,
        method,
        params,
        body,
    });
    next();
}
