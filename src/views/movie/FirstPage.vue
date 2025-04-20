<script setup>
import FirstPageBox from './components/FirstPageBox.vue' 
import { MovieGetHotService}  from '@/api/movie'
import {ref,onMounted} from 'vue'
const MovieHotList = ref([])

const getMovieHotList = async () => {
  const res = await MovieGetHotService()
  console.log(res.data.data)
  MovieHotList.value = res.data.data
}
getMovieHotList()
onMounted(() => {
  MovieHotList.value = MovieHotList.value.sort((a, b) => b.movieScore - a.movieScore)
})

</script>

<template>
    
  <el-carousel :interval="4000" type="card" height="600px" style="width: 700px; margin: 0 auto;" @change="handleCarouselChange">
    <el-carousel-item v-for="item in MovieHotList.slice(0,3)" :key="item.movie_id">
        
        <img src="@/assets/1.png" alt="轮播图片" style="width: 100%; height: 100%; object-fit: cover;">
       <!-- 图片连接用不了吗 -->
      
      <div class="moviename">
   {{ item.movieName }}</div>
    </el-carousel-item>
  </el-carousel>
    
    
    <FirstPageBox :movieList="MovieHotList">评分最多……</FirstPageBox>
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
    position: absolute;
    bottom:0;
    width: 100%;
    background-color: rgba(203, 203, 203, 0.598);
    text-align: center;
    color:white;
    height: 50px;
    line-height: 50px;
}


 .active{
        background-color: red;
        
    }
</style>


