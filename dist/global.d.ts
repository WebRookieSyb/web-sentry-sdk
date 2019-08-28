interface GlobalObject {
    sendError: boolean;
    sendUnloadError: boolean;
}
export declare class Global {
    private isActive;
    private oldErrorHandler;
    private options;
    private errordefo;
    constructor(options: GlobalObject);
    private init;
    private installGlobalErrorHandle;
    private trackWindowOnError;
    private trackUnloadError;
}
export {};
