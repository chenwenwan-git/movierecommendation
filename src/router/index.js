import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
{
  path:'/login',component:()=>import('@/views/login/LoginPage.vue')
},//登陆页面
{path:'/',component:()=>import('@/views/layout/LayoutContainer.vue'),
  redirect:'/movie/FirstPage',//重定向到电影首页
  children:[
    {path:'/movie/FirstPage',component:()=>import('@/views/movie/FirstPage.vue')},//电影首页
    {path:'/movie/Classification',component:()=>import('@/views/movie/MovieClassification.vue')},//电影分类
    {path:'/movie/Detail/:movieId',name:'MovieDetail' ,component:()=>import('@/views/movie/MovieDetail.vue')},//电影详情

    {path:'/user',component:()=>import('@/views/user/UserPage.vue'),//用户相关页面
  redirect:'/MyInfo',//重定向到用户首页
  children:[
    {path:'/user/MyInfo',component:()=>import('@/views/user/MyInfo.vue')},
    {path:'/user/MyTrends',component:()=>import('@/views/user/MyTrends.vue')},
    {path:'/user/ChangePassword',component:()=>import('@/views/user/ChangePassword.vue')},
  ],}
  ],

},

  ],
})


// 登陆访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore() // 获取用户模块
  // 判断是否没有token并且要访问的路径是用户相关路径
  if (!userStore.token && to.path.startsWith('/user')) {
    return '/login'
  }
  return true // 其他情况放行
})

export default router
