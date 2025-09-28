export class Logger {
    private isDebug: boolean;

    constructor() {
        this.isDebug = process.env['LOG_LEVEL'] === 'debug';
    }

    public debug(...args: unknown[]) {
        if (this.isDebug) {
            console.debug(args);
        }
    }

    public info(...args: unknown[]) {
        console.log(args);
    }

    public warn(...args: unknown[]) {
        console.warn(args);
    }

    public error(...args: unknown[]) {
        console.error(args);
    }
}
