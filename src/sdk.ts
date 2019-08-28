import { Options } from './type/options';
import { logger } from './util/log';
import { hub, EventBus } from "./util/hub";
import { Page } from "./page";
import { Global } from "./global";

const defaultOptions: Options = {
    getPage: true,
    getError: true,
    getUnloadError: true,
    getClientInfo: true,
    date: undefined
}

let globalIns:Global
let pageIns: Page
export const init = (options: Options, fn: Function) => {
    // 合并默认参数
    options = Object.assign({}, defaultOptions, options);
    // 是否开启debug
    if (options.debug === true) {
        // 开启logger
        logger.enable();
    }
    logger.log('start logging ...');
    if(options.getError === true){
        globalIns = new Global({
            sendError:options.getError,
            // sendUnhandledRejection:options.getUnhandledRejection,
            sendUnloadError:options.getUnloadError
        })
    }
    if (options.getPage === true) {
        pageIns = new Page()
    }
}

export const close = () => {
    logger.log('close sdk')
    hub.emit(EventBus.CHANGE_ACTIVE, false);
}