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
// import {ElMessageBox,ElMessage} from 'element-plus'
import { useUserStore } from '@/stores';



import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()  


const handleCommand = async (key)=>{

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
      userStore.setToken('')
      ElMessage({
        type: 'success',
        message: '退出登录成功!',
      })

    })
    
}
else{
  router.push('/'+key)
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
         
          <div @click="$router.push('/movie/FirstPage')" style="margin-right: 20px; font-weight: 700;">首页</div>
          <!-- 加粗显示 -->
          <div @click="$router.push('/movie/Classification')">分类</div>
          
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
              <el-dropdown-item command="profile" :icon="User"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >我的动态</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

       
    


<style scoped>
.common-layout {
  height: 100vh;
  /* color:white; */
  
  
  .el-header {
    background-color: rgb(95, 155, 138);
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
    height: 30px; /* 调整为合适高度 */
    display: inline-block; /* 设置合适的display属性 */
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