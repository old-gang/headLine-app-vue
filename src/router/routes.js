export const routes = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  // 布局，底部有导航栏的页面
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home', //默认子路由
        name: 'home',
        component: () => import('@/views/home'),
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
      },
    ],
  },
  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
  },
];
