<script setup>
import {

  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  Search
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()  


const handleCommand = async (key)=>{
//判断command指令，进行路由跳转或退出登陆操作
  if(key==='logout'){
    //进行退出登录操作
     ElMessageBox.confirm(
    '你确定要退出登录吗?',
    '温馨提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      
    }
  )
    .then(() => {
      //本地token清空
      userStore.setToken('')
      ElMessage({
        type: 'success',
        message: '退出登录成功!',
      })
      router.push('/movie/FirstPage')

    })
    
}
else{
  //跳转到对应页面
  router.push('/user/'+key)
}
}
</script>


    
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="left">
        <div style="font-size: 30px; color:white; ">电影推荐系统</div>
        <div class="nav">
         
          <div @click="$router.push('/movie/FirstPage')" style="margin-right: 20px;" :class="{bebold:this.$route.path === '/movie/FirstPage'}">首页</div>
          <!-- 加粗显示 -->
          <div @click="$router.push('/movie/Classification')" :class="{bebold:this.$route.path === '/movie/Classification'}">分类</div>
          
        </div>
         
           <el-input
      v-model="input2"
      style="width: 240px"
      placeholder="请输入电影名称"
      :prefix-icon="Search"
    />
         </div>
         
         <div class="loginBtn" v-if="!userStore.token" @click="$router.push('/login')">登录</div>
         
        <el-dropdown v-else placement="bottom-end" @command="handleCommand">
          
          <span class="el-dropdown__box">
            <span style="font-size: 20px;color:white;margin-right: 10px;">CHEN</span>
            <el-avatar :src="avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="MyInfo" :icon="User"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item command="MyTrends" :icon="Crop"
                >我的动态</el-dropdown-item
              >
              <el-dropdown-item command="ChangePassword" :icon="EditPen"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main style="margin-top: 60px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

       
    


<style scoped>
.bebold{
  font-weight: 700;
}
.common-layout {
  height: 100vh;
  
  
  .el-header {
    background-color: rgb(95, 155, 138);
    position: fixed;
    width: 100vw;
    z-index:1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
       display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    }
    .loginBtn{
      margin-right: 20px;
      color:white;
      font-size: 20px;
      cursor: pointer;
    }
    .nav{
      margin-left: 30px;
      width: 200px;
      height: 30px;
      display: flex;
      font-size: 20px;
      cursor: pointer;
      color:white;
    }
     .el-input {
    width: 200px;
    margin-left: 20px;
    height: 30px; 
    display: inline-block; 
  }
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  
}
</style>