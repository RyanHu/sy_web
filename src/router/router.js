import Vue from 'vue'
import Router from 'vue-router'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import Login from '../views/Login'
import MainPage from '../views/MainPage'
import UploadExcel from '../views/UploadExcel'
import VueRouter from 'vue-router'


/**配置路由 */

const routes = [
    {
        path: '/login',
        name: '登录',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        path: '/main',
        name: '主页',
        meta: {
            title: '功能选择主页面'
        },
        component: MainPage,
        children: [
            {
                path: '/uploadExcel',
                name: '上传Excel',
                meta: {
                    title: '导入Excel'
                },
                component: UploadExcel
            }
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router
