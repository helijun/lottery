import Vue from 'vue'
import VueRouter from 'vue-router'


// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
    if(to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.matched.length ===0) {//如果未匹配到路由
        next('/');
    }
    next()
})


export default router
