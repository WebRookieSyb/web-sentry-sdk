interface WebSentryGlobal {
    __WebSentryGlobal__: {
        hub?: any,
        logger?: any
    }
}

const GlobalObject = {};

export const getGlobalObject = (): WebSentryGlobal => {
    return GlobalObject as WebSentryGlobal;
}