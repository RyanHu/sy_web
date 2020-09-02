import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout =10000;
axios.defaults.withCredentials=true;

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data);


/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    return Promise.reject(error);
});

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    console.error(error)
});

export default axios ;