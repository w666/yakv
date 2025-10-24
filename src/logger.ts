import { LoggerOptions } from './types';

export class Logger {
    private isDebug: boolean;
    private prefix: string;

    constructor(options: LoggerOptions) {
        this.isDebug = process.env['LOG_LEVEL'] === 'debug';
        this.prefix = options.loggerName;
    }

    public debug(...args: unknown[]) {
        if (this.isDebug) {
            console.debug(`[${this.prefix}]`, args);
        }
    }

    public info(...args: unknown[]) {
        console.log(`[${this.prefix}]`, args);
    }

    public warn(...args: unknown[]) {
        console.warn(`[${this.prefix}]`, args);
    }

    public error(...args: unknown[]) {
        console.error(`[${this.prefix}]`, args);
    }
}
