<script setup>
import {EditPen,Lock } from '@element-plus/icons-vue'

import {ref} from 'vue'
const activeIndex = ref('1')
// 取得表单实例
const form = ref()
const formModel = ref({
    origin:'',
    password:'',
    repassword:''
})
const rules = {
    // TODO:规则先这样配置，以及是否需要自定义校验
    origin: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        // 这里之后进行原密码的校验
    ],
    password: [
        { required: true, message: '请输入修改后的密码', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
    ],
    repassword:[
        { required:true,message:'请再次输入修改后的密码',trigger:'blur'},
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

const change = async ()=>{
    //进行注册之前的表单校验，不成功会自动根据rules进行校验提示
    await form.value.validate()
    
    ElMessage.success('修改成功')
    //
    
    //这里进行修改请求，
    // await userRegisterService(formModel.value)
      //之后再看视频

      //退到登录页？？
      //本地密码如何修改，登陆状态如何修改
}
const reset = ()=>{
     formModel.value = {
        origin:'',
        password:'',
        repassword:''   
    }
}
</script>

<template>
    
        
        <div>
              <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    
    mode="horizontal"
    
  >
  
    <el-menu-item  index="1">
        <el-icon>
    <EditPen />
  </el-icon>
        修改密码</el-menu-item>
   
    
    
  </el-menu>
 
    </div>
<div class="passwordbox">
 <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off">
       
        <el-form-item prop="origin" label="原始密码">
          <el-input  v-model="formModel.origin" :prefix-icon="Lock" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="修改密码">
          <el-input
          v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入修改后的密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input
          v-model="formModel.repassword"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入修改后的密码"
          ></el-input>
        </el-form-item>
   
       
        
      </el-form>
      <div class="btn" style="margin-top: 10px;">
      <el-button @click="change" class="button" type="primary" auto-insert-space>
            确认修改
          </el-button>
          <!-- 回到重新登陆部分 -->
           <el-button @click="reset" class="button" type="primary" auto-insert-space>
            重置表单
          </el-button>
       
</div>
</div>



    

</template>

<style scoped>
.InfoContainer {
   margin:0 auto;
   width: 60vw;
   height: 100vh;
   padding:50px;
   background-color: white;
}
.passwordbox{
    width: 20vw;
    margin-top: 30px;

}
   
   
</style>