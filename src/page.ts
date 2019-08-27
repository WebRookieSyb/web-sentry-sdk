import { hub, EventBus } from './util/hub';
import { PerformanceModel } from './type/performance';
import { logger } from './util/log'
export class Page {
    private isActive = true;

    constructor() {
        this.init();
    }

    private init(): void {
        hub.on(EventBus.CHANGE_ACTIVE, (activeStatus: boolean) => {
            logger.log(`Page accepted ${EventBus.CHANGE_ACTIVE}: ${activeStatus}`);
            this.isActive = activeStatus;
        })

        window.addEventListener('load', () => {
            if (!this.isActive) {
                return;
            }
            const performance = this.getPagePerformance();
            logger.log(`Page get performance: ${JSON.stringify(performance)}`);
            hub.emit(EventBus.GET_CLIENT, performance);
        })
    }

    public getPagePerformance(): undefined | PerformanceModel {
        if (!window.performance || !window.performance.timing) {
            return;
        }
        const timing = window.performance.timing;
        let performance: PerformanceModel = {
            redirectt: (timing.redirectEnd - timing.redirectStart) / 1000,
            dnst: (timing.domainLookupEnd - timing.domainLookupStart) / 1000,
            tcpt: (timing.connectEnd - timing.connectStart) / 1000,
            wit: (timing.domLoading - timing.fetchStart) / 1000,
            responset: (timing.responseEnd - timing.requestStart) / 1000,
            domreadyt: (timing.responseEnd - timing.navigationStart) / 1000,
            domcompletet: (timing.domComplete - timing.domLoading) / 1000,
            domrendert: (timing.domInteractive - timing.domLoading) / 1000,
            scriptt: (timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart) / 1000
        }

        performance.allt = performance.redirectt + performance.dnst + performance.tcpt + performance.responset + performance.domcompletet + performance.domrendert
        return performance;
    }
}