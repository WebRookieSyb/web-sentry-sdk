import base from './rollup.config.base'
const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'WebSentrySDK',
        file:'dist/web-monitor-sdk.min.js',
        format:'iife'
    }
})

export default config