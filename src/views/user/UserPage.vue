<script setup>
import {
  Management,
  Promotion,

 
} from '@element-plus/icons-vue'

</script>

<template>
     <el-container class="layout-container">
    <el-aside width="200px">
      <div style="font-size: 20px;color:white;margin-top:20px;margin-left: 20px;">个人主页</div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/user/MyInfo">
          <el-icon><Management /></el-icon>
          <span>我的信息</span>
        </el-menu-item>
        <el-menu-item index="/user/MyTrends">
          <el-icon><Promotion /></el-icon>
          <span>我的动态</span>
        </el-menu-item>
         <el-menu-item index="/user/ChangePassword">
          <el-icon><Promotion /></el-icon>
          <span>修改密码</span>
        </el-menu-item>
       
      </el-menu>
    </el-aside>
    <el-container>
  
      <el-main>
        <router-view></router-view>
      </el-main>
      
    </el-container>
  </el-container>
    

</template>


<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
  
    .el-menu {
      border-right: none;
      margin-top: 20px;
      margin-left: 20px;
    }
  }


}
</style>