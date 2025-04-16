<script setup>
import FirstPageBox from './components/FirstPageBox.vue';   
    const imageList = [
        {src:'/src/assets/1.png', name:'第一个电影', id:'1'},
        {src:'/src/assets/2.png', name:'第二个电影' ,id:'2'},
        {src:'/src/assets/3.png', name:'第三个电影' ,id:'3'},
    ]
</script>

<template>
    
  <el-carousel :interval="4000" type="card" height="600px" style="width: 700px; margin: 0 auto;">
    <el-carousel-item v-for="item in imageList" :key="item.id">
        <!-- 之后修改key -->
        <img :src="item.src" alt="轮播图片" style="width: 100%; height: 100%; object-fit: cover;">
      
      
    </el-carousel-item>
  </el-carousel>
    <div class="moviename">
    <el-button v-for="item in imageList" :key="item.id" :class="{active:item.id === '2'}">{{ item.name }}</el-button></div>
    <FirstPageBox></FirstPageBox>
    <FirstPageBox></FirstPageBox>
</template>

<style scoped>

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.moviename{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
}
.el-button{
    margin: 10px;
    background-color: #bcbebf;
    color: white;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
   
    
}
 .active{
        background-color: red;
        
    }
</style>


