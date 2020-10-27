'use strict'

import Vue from 'vue'
import axios from 'axios'
import util from '@/util/util.js'
import qslib from 'qs'
import store from '@/store/index.js'
import { Loading } from 'element-ui';

let baseURL = 'http://api1.jshine.com.cn/'
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = baseURL
// axios.defaults.baseURL = 'http://localhost:8888/'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Origin'] = 'http://20.16.3.116:8080'
let qs = qslib
let config = {
    timeout: 5000,
    method: 'get',
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
    params: {
        // ID: 12345
    },
    data: {
        // firstName: 'Liuxiaofan'
    },
    withCredentials: false, // Check cross-site Access-Control
    // auth: {
    //     username: '',
    //     password: ''
    // },
    responseType: 'json',
    validateStatus: function (status) {
        // return status >= 200 && status < 300
        return status === 200
    }
}
const _axios = axios.create(config)
const checkCode = (status) => {
    switch (status) {
        case 203:
            console.info('203')
            break
        case 204:
            console.info('no find')
            break
        case 205:
            console.info('server err')
            break
        default:
            console.info('request failed')
    }
}
let loadingInstance = null;
_axios.interceptors.request.use(
    config => {
        loadingInstance = Loading.service({
            fullscreen:true
        });

        let token = store.getters.token;
        console.log('token = '+token)
        if (token!= undefined && token != '') {
            config.headers['token']=token
        }
        if (config.method == 'post') {
            let params = util.objKeySort(config.data)
            params.sign = util.getMd5(params)
            config.data = qs.stringify(params)
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            // let cookie = document.cookie
        }
        return config
    },
    error => {
        loadingInstance.close()
        console.info({ message: 'Timeout!' })
        return Promise.resolve(error)
    })

_axios.interceptors.response.use(
    response => {
        loadingInstance.close()

        // Do something with response data
        return response.data
    },
    error => {
        // Do something with response error
        console.log('on interceptors error')
        loadingInstance.close()

        let status = error.response.status
        checkCode(status)
        return Promise.reject(error)
    }
)

Plugin.install = function (Vue) {
    Vue.axios = _axios
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios
            }
        },
        $axios: {
            get() {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
