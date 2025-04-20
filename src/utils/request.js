
import axios from 'axios'
import {useUserStore} from '@/stores'
import {ElMessage} from 'element-plus'
import router from '@/router'

// baseurl
const baseURL = 'http://8.134.80.166'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
  

})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.Authorization = token // 请求头携带token
      
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    if(res.data.code === 200){
        return res
    }
    //处理业务失败
    
    // 提示错误信息，抛出错误
    ElMessage.error(res.data.message || '服务异常，请稍后再试')
    //错误提示，以接口对应的message为主
    return Promise.reject(res.data)
    //使用elementplus提示框
    
  }, 
  (err) => {
      // TODO 5. 处理401错误
    //错误的特殊情况，权限不足，token过期，拦截到登陆
    if (err.response?.status === 401) {
        router.push('/login')
    }
      //错误的默认情况，给提示
    ElMessage.error(err.response.data.message || '服务异常，请稍后再试')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL } // 导出基础地址