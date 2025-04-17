<script setup>
import { ChatRound,Film,Star } from '@element-plus/icons-vue'
import MyInfoBasic from './components/MYInfoBasic.vue';
import {ref} from 'vue'
const activeIndex = ref('1')

</script>

<template>
    <div class="InfoContainer">
        <MyInfoBasic></MyInfoBasic>
        <div>
              <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    
    mode="horizontal"
    
  >
  
    <el-menu-item  index="1">
        <el-icon>
    <Star />
  </el-icon>
        推荐</el-menu-item>
   
    
    <el-menu-item index="2" > <el-icon>
    <ChatRound />
  </el-icon>
        动态</el-menu-item>
    <el-menu-item index="3"> <el-icon>
    <Film />
  </el-icon>看过</el-menu-item>
  </el-menu>
 
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
   
   
</style>