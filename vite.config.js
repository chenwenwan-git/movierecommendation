import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //配置反向代理
  server: {
    host: '127.0.0.1', // 主机ip
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开(就是npm run dev后，会自动在浏览器打开这个项目的意思，而不需要我们再手动点一次网页链接)
    port: 5173, // 端口号默认值5173
    // 代理，即'/api'会被转义成'http://192.168.xx.xx:8080',作用于接口前缀
    proxy: {
      "/api": {
        target: `http://8.134.80.166`, // 后台接口前缀
        changeOrigin: true, // 是否允许跨域
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  },
})


