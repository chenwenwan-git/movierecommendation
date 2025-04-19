<script setup>
import {useRoute} from 'vue-router'
import {ref} from 'vue'
import { getMovieById } from '@/api/movie'

const route = useRoute()
const movieId = route.params.movieId

const dataList = ref([])
const getMovieDetailList = async(movieId) =>{
  const res  = await getMovieById(movieId)
   
  dataList.value = res.data.data
}
getMovieDetailList(movieId)

</script>

<template>
<div class="container">
  <div class="headerbox" :style="{ '--bg-image-url': `url('${dataList.postUrl}')` }">
    <div class="box">
      <div class="info w">
<div class="movie-poster">
      <img :src="dataList.postUrl" alt="">
    </div>


 <div class="movie-info">
  <div class="out">
      <h2 class="movie-title">{{ dataList.movieName }}</h2>
      <div class="movie-rating">
        
        <span class="rating-text">评分</span>
      </div>
      </div>
      <div class="inner" style="margin-top: 20px;">
      
        <div class="d">导演：{{dataList.director}}</div>
        <div class="d">演员：{{dataList.actors}}</div>
        <div class="d">简介：{{dataList.plotSummary}}</div>
        <div class="d">导演：</div>
        </div>
    
     
     
      </div>
 </div>

   

    </div>
   
  </div>
  <div class="comment w">
    我要评分
  </div>
</div>

</template>

<style scoped>
.headerbox {
  width: 100%;
  height: 500px; 
  
 
   position: relative;
   display: flex;
   justify-content: flex-start;
   align-items: flex-start;
 
  
}
.headerbox::before{
    content:'';
    
      background-image: var(--bg-image-url);
  background-size: cover;
  background-position: center;
  filter:blur(7px);
  position: absolute;
  top:0;
  bottom: 0;
  right:0;
  left:0;
  z-index:-1;
    
}
 .movie-poster{
    width: 230px;
    height: 320px;
    
    margin-top: -90px;
    margin-right: 30px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit:cover;
    }
  }

 
.d{
  margin-bottom: 10px;
}
  .box{
    height:50%;
    position:absolute;
    bottom:0;
    width:100vw;
    
    background-color:rgba(95, 155, 138,0.7);
    
    
  }
  .w{
    margin:0 auto;
width: 70vw;
  }
  .info{
color:white;
display:flex;
    justify-content: center;
   align-items: flex-start;
  }


.movie-title {
  margin-top: 0;
  
}


.out{
  height: 80px;
  position: absolute;
  top:-80px;
  
}
.movie-info {
  flex: 1;
 
}

 .comment{
    height: 900px;

    
  }
</style>