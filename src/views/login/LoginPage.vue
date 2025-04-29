<script setup>
//导入接口文件
import { register, login } from '@/api/user.js'
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(false)
// 取得表单实例
const form = ref()

const formModel = ref({
  userName: '',
  passWord: '',
  repassWord: '',
})

// 通用的密码验证规则
const passwordRules = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 6, max: 13, message: '长度在 6 到 13 个数字', trigger: 'blur' },
  {
    validator(rule, value, callback) {
      // 判断是否为纯数字
      if (/^\d+$/.test(value)) {
        callback()
      } else {
        callback('密码必须由数字组成')
      }
    },
    trigger: 'blur',
  },
]
const rules = {
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  passWord: passwordRules,
  repassWord: [
    ...passwordRules,
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.passWord) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}
const getRegister = async () => {
  //进行注册之前的表单校验，不成功会自动根据rules进行校验提示
  await form.value.validate()

  await register(formModel.value)
  ElMessage.success('注册成功')
  // 如果注册成功，则返回登录页进行登陆
  isRegister.value = false
}

const userStore = useUserStore()
const router = useRouter()
//登陆请求
const getLogin = async () => {
  await form.value.validate()
  // chen-11111111
  //cww 111111
  // 接收token
  const res = await login(formModel.value)
  userStore.setToken(res.data.data)

  ElMessage.success('登陆成功')
  //跳到首页
  // router.push('/movie/FirstPage')
  router.back()
}

//切换登陆注册时，重置表单，由于使用的是同一个对象
watch(isRegister, () => {
  formModel.value = {
    userName: '',
    passWord: '',
    repassWord: '',
  }
})
</script>

<template>
  <div class="login-page">
    <div class="form">
      <!-- ruleFore绑定整个表单的输入 -->
      <!-- rules绑定整个校验对象 -->
      <!-- 注册表单 -->
      <div class="title">电影推荐系统</div>
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input
            v-model="formModel.userName"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="formModel.passWord"
            :prefix-icon="Lock"
            type="passWord"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassWord">
          <el-input
            v-model="formModel.repassWord"
            :prefix-icon="Lock"
            type="passWord"
            placeholder="请输入再次密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getRegister" class="button" type="primary" auto-insert-space>
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
        <el-form-item prop="userName">
          <el-input
            v-model="formModel.userName"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="formModel.passWord"
            name="passWord"
            :prefix-icon="Lock"
            type="passWord"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="getLogin" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 没账号？先去创建 → </el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url('@/assets/loginbg.png') no-repeat center / cover;
  .title {
    font-size: 30px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .form {
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    // box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin: 0 auto;
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