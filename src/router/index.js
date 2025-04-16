import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/stores' // 引入用户模块

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
{
  path:'/login',component:()=>import('@/views/login/LoginPage.vue')
},//登陆页面
{path:'/',component:()=>import('@/views/layout/LayoutContainer.vue'),
  redirect:'/movie/Classification',//重定向到电影首页
  children:[
    {path:'/movie/Classification',component:()=>import('@/views/movie/MovieClassification.vue')},//电影分类
    {path:'/movie/FirstPage',component:()=>import('@/views/movie/FirstPage.vue')},//电影首页
  ],

},

      

  ],
})


// //登陆访问拦截
// router.beforeEach((to) => {
//   const useStore = useUserStore() // 获取用户模块
//   if (!useStore.token && to.path !== '/login') return '/login'
//   return true//其他情况放行
//   })


export default router
