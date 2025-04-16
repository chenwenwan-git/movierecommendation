<script setup>
//导入注册接口文件
// import {userRegisterService,userLoginService} from '@/api/user.js'
import {userRegisterService} from '@/api/user.js'
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import {watch} from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(false)
// 取得表单实例
const form = ref()

//注册
//之后根据接口文档的规则和内容进行修改
const formModel = ref({
    username:'',
    password:'',
    repassword:''
})
const rules = {
    // TODO:规则先这样配置，以及是否需要自定义校验
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
    ],
    repassword:[
        { required:true,message:'请再次输入密码',trigger:'blur'},
        { min:6,max:12,message:'长度在6到12个字符',trigger:'blur'},
        {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
    ]
}
const register = async ()=>{
    //进行注册之前的表单校验，不成功会自动根据rules进行校验提示
    await form.value.validate()
    console.log("成功了，可以开始注册请求")
    //这里进行注册请求，
    await userRegisterService(formModel.value)
      //之后再看视频
}

const userStore = useUserStore()
const router = useRouter()
const login = async ()=>{
    await form.value.validate()
    
    //接收token
    // const res = await userLoginService(formModel.value)
    //测试
    // userStore.setToken(res.data.token)
    console.log(userStore.token)
    userStore.setToken('gggg')
    // 下面这个报错了，之后修改
    // ElMessage.success('登陆成功')
    console.log('登陆成功')
    console.log(userStore.token)
    router.push('/movie/FirstPage')
}

//切换登陆注册时，重置表单，由于使用的是同一个对象
watch(isRegister,()=>{
    formModel.value = {
        username:'',
        password:'',
        repassword:''   
    }
    
})

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
        <!-- ruleFore绑定整个表单的输入 -->
         <!-- rules绑定整个校验对象 -->
          <!-- 注册表单 -->
      <el-form  :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
          v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            <!-- 修改isRegister的值，切换注册和登陆 -->
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登陆表单 -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
          v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            
            创建账号 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/3.png') no-repeat 60% center / 240px auto,
    
      url('@/assets/2.png') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>