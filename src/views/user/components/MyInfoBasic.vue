<script setup>
import { Edit,Male } from '@element-plus/icons-vue'
</script>

<template>
    
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
</template>

<style scoped>
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