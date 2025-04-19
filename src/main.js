

import { createApp } from 'vue'
import pinia from '@/stores/index.js'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'

const app = createApp(App)
 
//解决路由切换回滚顶部的问题
router.afterEach(() => {
  document.documentElement.scrollTop = 0;
})
app.use(pinia)
app.use(router)

app.mount('#app')
