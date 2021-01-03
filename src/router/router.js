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
import DownloadExcel from '../views/DownloadExcel'
import QueryInit from '../views/QueryInit'
import QueryProcessing from '../views/QueryProcessing'
import QueryHistory from '../views/QueryHistory'
import VueRouter from 'vue-router'
import DpMain from "../views/DpMain";
import YmhzBaffle from "../views/YmhzBaffle";


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
        path:'/dpmain',
        name:'大田主页',
        meta: {
            title: '大田监控中心'
        },
        component: DpMain,

    },
    {
        path:'/ymhzBaffle',
        name:'主页',
        meta: {
            title: '总部消息管理平台'
        },
        component: YmhzBaffle,
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
            },
            {
                path: '/downLoadExcel',
                name: '下载Excel',
                meta: {
                    title: '导出Excel'
                },
                component: DownloadExcel
            },
            {
                path: '/QueryInit',
                name: '查询发起中',
                meta: {
                    title: '发起中'
                },
                component: QueryInit
            }
            ,
            {
                path: '/QueryProcessing',
                name: '查询处理中',
                meta: {
                    title: '处理中'
                },
                component: QueryProcessing
            }
            ,
            {
                path: '/QueryHistory',
                name: '查询历史',
                meta: {
                    title: '历史记录'
                },
                component: QueryHistory
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router
