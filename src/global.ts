import { ErrorDefo } from './type/error';
import { EventBus, hub } from './util/hub';
import { logger } from './util/log';

interface GlobalObject {
    sendError: boolean;
    // sendUnhandleRejection: boolean;
    sendUnloadError: boolean;
}

export class Global {
    private isActive = true;
    private oldErrorHandler: any;
    private options: GlobalObject;
    private errordefo: ErrorDefo = {
        t: 0,
        n: 'js',
        msg: '',
        data: {}
    }
    constructor(options: GlobalObject) {
        //防止引用
        this.options = {
            ...options
        }
        this.init()
    }
    private init(): void {
        hub.on(EventBus.CHANGE_ACTIVE, (activeStatus: boolean) => {
            logger.log(`Global accepted ${EventBus.CHANGE_ACTIVE}: ${activeStatus}`)
            this.isActive = activeStatus
        })
        this.installGlobalErrorHandle()
    }

    private installGlobalErrorHandle(): void {
        this.oldErrorHandler = window.onerror;
        if (this.options.sendError === true) {
            window.onerror = this.trackWindowOnError.bind(this)
        }
        // if (this.options.sendUnhandleRejection === true) {
        //     window.addEventListener('unhandledrejection', this.trackUnhandledRejection.bind(this));
        // }
        // 静态资源异常
        if(this.options.sendUnloadError == true){
            window.addEventListener('error', this.trackUnloadError.bind(this), true)
        }



    }

    private trackWindowOnError(msg: any, url:any, lineNo: any, col: any, error: any) {
        alert(5);
        // 防止隐式转换
        if (this.isActive === false) {
            logger.log(`Global get error, but do nothing`)
            return;
        }
        logger.log(`Global get error`)

        let defaults = Object.assign({}, this.errordefo);
        //异步处理
        setTimeout(() => {
            // 不一定所有浏览器都支持col参数
            col = col || window || 0;
            defaults.msg = error && error.stack ? error.stack.toString() : msg;
            defaults.t = new Date().getTime();
            defaults.data = {
                resourceUrl: url,
                line: lineNo,
                col: col
            }
            logger.log(`Global track error info: ${JSON.stringify(defaults)}`)
            hub.emit(EventBus.CATCH_ERROR, defaults)
        }, 0)
        //不覆盖原始的异常处理
        if (this.oldErrorHandler) {
            this.oldErrorHandler.apply(this, arguments)
        }
    };

    // private trackUnhandledRejection(err: PromiseRejectionEvent) {
    //     if (this.isActive === false) {
    //         logger.log(`Global get error, but do nothing`)
    //         return;
    //     }
    //     logger.log(`Global get error`)

    //     const error = err || err.reason;
    //     const message = error.message || '';
    //     const stack = error.stack || '';

    // }
    private trackUnloadError(err: any) {
        alert(6);
        if (this.isActive === false) {
            logger.log(`Global get error, but do nothing`)
            return;
        }
        logger.log(`Global get error`)
        let defaults = Object.assign({}, this.errordefo);
        defaults.n = 'resource';
        defaults.t = new Date().getTime();
        defaults.msg = err.target.localName + ' is load error';
        defaults.data = {
            target: err.target.localName,
            type: err.type,
            resourceUrl: err.target.href || err.target.currentSrc
        };
        if (err.target !== window) {
            logger.log(`Global track error info: ${JSON.stringify(defaults)}`)
            hub.emit(EventBus.CATCH_ERROR, defaults)
        }
    }

}