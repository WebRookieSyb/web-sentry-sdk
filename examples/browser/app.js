// window.onerror = () => {
//   console.warn("old error");
// };

/**
 * test hub
 */
// window.WebMonitorSDK.hub.on('error',(msg)=>{console.log(msg)})
// window.WebMonitorSDK.hub.on('error',(handle)=>{
//     if(typeof handle === 'function'){
//         handle()
//     }
// })

// window.WebMonitorSDK.hub.emit('error','message')
// window.WebMonitorSDK.hub.emit('error',()=>{console.log('xixi')})

/**
 * test close sdk
 */
// window.WebMonitorSDK.close()
/**
 * test window.onerror catch
 */
// window.WebMonitorSDK.hub.on("CATEH_ERROR", data => {
//   console.warn(data);
// });

// notcatcherror

//*************************** */
/**
 * catched error not show in sdk
 */
// try{
// catcherror
// }catch(err){
// }

// setTimeout(()=>{
//     notcatcherrorsetimoeout
// },2000)

//************************ */

/**
 * test unhandledrejection error by promise
 */
// setTimeout(() => {
//     Promise.reject(new Error('unhandledrejection'))
//   }, 1000)

//**************************** */

/**
 * test img load
 */

//************************ */
/**
 * test page performance
 */

// window.WebSentrySDK.hub.on("GET_PERFORMANCE", data => {
//   console.warn(data);
// });

window.WebSentrySDK.init(
  {
    debug: true,
    getPage: true,
    getError: true,
    outtime: 3000,
    data: {
      webUser: {
        id: 12345
      }
    }
  },
  data => {
    // fetch("http://demo/api", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data)
    // });
    // console.log(JSON.stringify(date))
  }
);
error;
