import Vue from 'vue'
import modelList from '@/api/model-list.js'
import util from '@/util/util.js'
import loadingHelper from '@/util/loading-helper.js'

const P = {}
const apis = {}
let apiArr = modelList
// check API name wether repeat
let isRepeat = arr => {
    let h = {}
    let r = []
    let k = []
    arr.forEach(m => {
        k.push(...Object.keys(m))
    })
    k.forEach((m) => {
        if (h[m]) {
            r.push(m)
        } else {
            h[m] = m
        }
    })
    if (r.length > 0) {
        throw new Error('redefined api name!')
    }
}
isRepeat(apiArr)

Object.assign(apis, ...apiArr)

P.install = (Vue) => {
    Vue.prototype.$http = apis
    let keys = Object.keys(apis)
    keys.forEach(key => {
        apis[key] = util.aopFunConstructor(apis[key], function () {
            //调用请求的前置通知
            let args = arguments
            loadingHelper.loading = true

            for (let i = 0; i < args.length; i++) {
                // if (args[i] instanceof loadingHelper.loadingParam) {
                //   loadingHelper.loadingText = args[i].txt;
                //   loadingHelper.loadingTime = args[i].time;
                // }
            }
        }, function () {
            setTimeout(function () {
                loadingHelper.loading = false
            }, loadingHelper.loadingTime)
            // }
            //调用请求的后置通知
        })
    })
    Vue.prototype.getDate = function () {
        let dateNew = new Date()
        return dateNew
    }
}
Vue.use(P)
export default P
