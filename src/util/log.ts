import { getGlobalObject } from './env';
const global = getGlobalObject();

const PREFIX = 'Web Sentry Logger ';

class Logger {
    private enabled: boolean;
    public prefix: string;
    constructor(prefix: string = 'Logger ') {
        this.enabled = false;
        this.prefix = prefix;
    }
    public disable(): void {
        this.enabled = false;
    }
    public enable(): void {
        this.enabled = true;
    }

    public log(...args: any[]): void {
        if (!this.enabled) {
            return;
        }
        console.log(`${this.prefix}[Log]: ${args.join(' ')}`);
    }
    public wran(...args: any[]): void {
        if (!this.enabled) {
            return;
        }
        console.log(`${this.prefix}[Wran]: ${args.join(' ')}`);
    }
    public error(...args: any[]): void {
        if (!this.enabled) {
            return;
        }
        console.log(`${this.prefix}[Error]: ${args.join(' ')}`);
    }

}

//保证全局单例
global.__WebSentryGlobal__ = global.__WebSentryGlobal__ || {};
const logger = global.__WebSentryGlobal__.logger || (global.__WebSentryGlobal__.logger = new Logger(PREFIX));
export { logger };