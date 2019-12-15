const frameIn = [
    {
        path: '/lottery-table',
        name: 'lottery-table',
        meta: {
            title: '抽桌'
        },
        component: () => import('@/views/lottery/table.vue')
    }
]
/**
 * 错误页面
 */
const errorPage = [
    // {
    //     path: '*',
    //     name: '404',
    //     component: _import('system/error/404/index.vue')
    // }
]

// 重新组织后导出
export default [
    ...frameIn,
    ...errorPage
]
