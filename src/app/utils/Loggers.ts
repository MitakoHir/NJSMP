import * as winston from 'winston';

export const uncaughtExceptionLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: {service: 'Application uncaught exception logger'},
    transports: [
        new winston
            .transports
            .Console({
                format: winston.format.json(),
            }),
    ],
});

export const uncaughtRejectionLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: {service: 'Application uncaught rejection logger'},
    transports: [
        new winston
            .transports
            .Console({
                format: winston.format.json(),
            }),
    ],
});

export const controllerErrorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: {service: 'Controller logger'},
    transports: [
        new winston
            .transports
            .Console({consoleWarnLevels: ['error', 'warn'], format: winston.format.json()}),
    ],
});

export const routeDebugLogger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: {service: 'Route logger'},
    transports: [
        new winston
            .transports
            .Console({format: winston.format.json()}),
    ],
});

export const serviceErrorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: {service: 'Service logger'},
    transports: [
        new winston
            .transports.Console({format: winston.format.json()}),
    ],
});
