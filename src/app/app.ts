import { uncaughtExceptionLogger, uncaughtRejectionLogger } from './utils/Loggers';
import exampleServer from './server';

process.on('uncaughtException', (err) => {
    uncaughtExceptionLogger.error('There is uncaught exception inside application',
        {errorMessage: err.message, stacktrace: err.stack},
    );
});

process.on('unhandledRejection', (reason) => {
    const reasonObj = reason instanceof RangeError
        ? {errorMessage: reason.message, errorStacktrace: reason.stack}
        : reason;
    // Hack due to the issue in winston library https://github.com/winstonjs/winston/issues/1498
    uncaughtRejectionLogger.error(
        'There is unhandled promise rejection inside application',
        {...reasonObj},
    );
});


const server = exampleServer.start(3000);
export default server;
