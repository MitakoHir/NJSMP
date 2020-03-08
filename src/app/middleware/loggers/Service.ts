import { serviceErrorLogger } from '../../utils/Loggers';

export function ServiceMethodLogger() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async (...args: any) => {
            try {
                await originalMethod.apply(this, args);
            } catch (e) {
                serviceErrorLogger.error('There is an error in service layer',
                    {
                        serviceName: target.name.trim(),
                        methodName: propertyKey,
                        arguments: args,
                        errorMessage: e.message,
                        errorStacktrace: e.stack,
                    },
                );
                throw Error(e);
            }
        };

        return descriptor;
    };
}
