import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(persist)
pinia.use(persist)

export default pinia

export * from './modules/user' // 导出 user 模块