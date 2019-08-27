import { getGlobalObject } from './env';
const global = getGlobalObject();

export enum EventBus {
    ERROR = 'ERROR',
    CHANGE_ACTIVE = 'CHANGE_ACTIVE',
    CATCH_ERROR = 'CATEH_ERROR',
    GET_PERFORMANCE = 'GET_PERFORMANCE',
    GET_CLIENT = 'GET_CLIENT'
}

class Hub {
    private eventList: string[]

    constructor() {
        this.eventList = []
    }

    public emit(event: string, date: object | Function): void {
        (this.eventList[event] || []).forEach(handle => handle(date));
    }

    public on(event: string, handle: Function): void {
        if (!this.eventList[event]) {
            this.eventList[event] = [];
        }
        this.eventList[event].push(handle)
    }

    public off(event: string, handle: Function): void {
        const index = (this.eventList[event] || []).findIndex(h => h===handle)
        if (index > -1) {
            this.eventList[event].splice(index, 1)
        }
    }
}

global.__WebSentryGlobal__ = global.__WebSentryGlobal__ || {};
const hub = global.__WebSentryGlobal__.hub || (global.__WebSentryGlobal__.hub = new Hub());
export { hub }