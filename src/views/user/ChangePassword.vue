<script setup>
import {EditPen,Lock } from '@element-plus/icons-vue'
import {updatePassword} from '@/api/user.js'
import { useUserStore } from '@/stores'
import {ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()  

const activeIndex = ref('1')
const userStore = useUserStore()
// 取得表单实例
const form = ref()
const formModel = ref({
    oldPassword:'',
    newPassword:'',
    rePassword:''
})




const rules = {
    
    oldPassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 6, max: 13, message: '长度在 6 到 13 个数字', trigger: 'blur' },
        {
        validator(rule, value, callback) {
            // 判断是否为纯数字
            if (/^\d+$/.test(value)) {
                callback();
            } else {
                callback('密码必须由数字组成');
            }
        },
        trigger: 'blur'
    }
        // 这里之后进行原密码的校验，应该不用吧
    ],
    newPassword: [
        { required: true, message: '请输入修改后的密码', trigger: 'blur' },
        { min: 6, max: 13, message: '长度在 6 到 13 个数字', trigger: 'blur' },
        {validator(rule,value,callback){
          if(value === formModel.value.oldPassword && value){
            callback('新老密码不能一样')

          }else{
            callback()
          }
        }},
        {
        validator(rule, value, callback) {
            // 判断是否为纯数字
            if (/^\d+$/.test(value)) {
                callback();
            } else {
                callback('密码必须由数字组成');
            }
        },
        trigger: 'blur'
    }
    ],
    rePassword:[
        { required:true,message:'请再次输入修改后的密码',trigger:'blur'},
        { min:6,max:12,message:'长度在6到12个字符',trigger:'blur'},
        {
        validator(rule, value, callback) {
            // 判断是否为纯数字
            if (/^\d+$/.test(value)) {
                callback();
            } else {
                callback('密码必须由数字组成');
            }
        },
        trigger: 'blur'
    },
        {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.newPassword) {
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
    const { oldPassword, newPassword } = formModel.value;
    await form.value.validate()
    await updatePassword(oldPassword,newPassword,{})
    ElMessage.success('修改成功')
    //
    userStore.setToken('')
    router.push('/login')
    
}
const reset = ()=>{
     formModel.value = {
        oldPassword:'',
        newPassword:'',
        rePassword:''   
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
       
        <el-form-item prop="oldPassword" label="原始密码">
          <el-input  v-model="formModel.oldPassword" :prefix-icon="Lock" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="修改密码">
          <el-input
          v-model="formModel.newPassword"
            name="newPassword"
            :prefix-icon="Lock"
            type="newPassword"
            placeholder="请输入修改后的密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rePassword" label="确认密码">
          <el-input
          v-model="formModel.rePassword"
            name="newPassword"
            :prefix-icon="Lock"
            type="newPassword"
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