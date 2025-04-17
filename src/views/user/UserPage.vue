<script setup>
import { Edit,Male } from '@element-plus/icons-vue'
import { ChatRound,Film,Star } from '@element-plus/icons-vue'

import {ref} from 'vue'
const activeIndex = ref('1')

//监听当前路由？？

</script>

<template>
    <div class="InfoContainer">
        <div class="myinfo">
        <div class="avatar">
        <img src="@/assets/default.png" alt="">
        
        </div>
        <div class="info">
            <div class="username box">CHEN<el-icon style="margin-left: 10px;"><Male /></el-icon></div>
            <div class="typespreference box">类型喜好:</div>
            <div class="regionspreference box">地区喜好:</div>
            <el-button plain :icon="Edit" >编辑个人资料</el-button>
        </div>
        </div>
    

        <hr>
         <div v-if="this.$route.path !== '/user/ChangePassword'">
              <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    
    mode="horizontal"
    
  >
  
    <el-menu-item  index="1" @click="$router.push('/user/MyInfo')">
        <el-icon>
    <Star />
  </el-icon>
        推荐</el-menu-item>
   
    
    <el-menu-item index="2" @click="$router.push('/user/MyTrends')" > <el-icon>
    <ChatRound />
  </el-icon>
        动态</el-menu-item>
    <el-menu-item index="3"> <el-icon>
    <Film />
  </el-icon>看过</el-menu-item>
  </el-menu>
 
    </div>
        <router-view></router-view>
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
   
.myinfo{
    display: flex;
    
    justify-content: flex-start;
    align-items: flex-start;
   
   .avatar{
    width: 150px;
    height: 150px;
    padding:5px;
    border:1px solid gray;
    margin-right: 20px;
   }
   .info{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .box{
        margin-bottom: 10px;
        font-weight: bold;
        color:rgb(64, 158, 255);
    }
    .username{
        font-size: 20px;
        
        
    }
   }
   img{
    width: 150;
    height: 150px;
   }}

</style>