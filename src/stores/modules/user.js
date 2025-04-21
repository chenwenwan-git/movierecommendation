import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (newtoken) => {
      (token.value = newtoken) // 设置 token
      
      
    }

    return { token, setToken }//暴露
  },
  {
    persist: true // 持久化
  }
)
