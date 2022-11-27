import { createRouter, createWebHashHistory } from 'vue-router'

// 引入路由表
import { routes } from './routes'

// 使用路由表
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

// 导出路由
export default router
