<script setup>
import MovieLabel from './components/MovieLabel.vue';
// import EveryMovieCard from './components/EveryMovieCard.vue';
import { ref } from 'vue'
import { RefreshLeft } from '@element-plus/icons-vue'
import { cateMovies } from '@/api/movie'
import { useRouter } from 'vue-router'

// 类型数据
const types = ref([
  { label: '全部', isActive: true ,id:0},
  { label: '动作', isActive: false ,id:1},
  { label: '悬疑', isActive: false ,id:2},
  { label: '科幻', isActive: false ,id:3},
  { label: '励志', isActive: false ,id:4},
  { label: '动画', isActive: false ,id:5},
  { label: '惊悚', isActive: false ,id:6},

])
const cateMovieList = ref([])
const loading = ref(false)

const router = useRouter()
const getCateMovieList = async(typeId) =>{
  loading.value = true
  const res  = await cateMovies(typeId)
   const newData = res.data.data.map(item => {
    item.movieScore = +item.movieScore/2; // 用+操作符强制转换

    return item;
  });
  cateMovieList.value = newData
  loading.value = false
}
getCateMovieList(0)




//标签的点击事件
const toggleTypeActive = (type) => {
  types.value.forEach(t => t.isActive = false)
  type.isActive = true
  getCateMovieList(type.id)

}
// const toggleRegionActive = (region) => {
//   regions.value.forEach(r => r.isActive = false)
//   region.isActive = true
// }
const reload = () => {
  // 重新加载逻辑，调用接口重新获取数据
 // 先将“全部”类型设为激活状态
  types.value.forEach(t => t.isActive = false)
  const allType = types.value.find(t => t.id === 0)
  if (allType) {
    allType.isActive = true
  }
  // 调用获取电影列表的函数，传入“全部”类型的id
  getCateMovieList(0)
  console.log('执行重新加载操作')
}

const goToMovieDetail = (movieId) => {
  router.push({ name: 'MovieDetail', params: { movieId: movieId } })
}

</script>

<template>
  <div class="container">
     <div class="filter-container">
    <el-button round @click="reload">
      <el-icon><RefreshLeft /></el-icon>
      重新加载
    </el-button>
    <MovieLabel :items="types" label="类型:" @toggleActive="toggleTypeActive" />
    <!-- <MovieLabel :items="regions" label="地区:" @toggleActive="toggleRegionActive" /> -->
  </div>
  <div class="moviecard" v-loading="loading">
     <div class="cardcontainer" v-for="item in cateMovieList" :key="item.movie_id" style="margin-bottom: 20px;" @click="goToMovieDetail(item.movie_id)">

        <div class="moviephoto">
            <img :src="item.postUrl" alt="">
        </div>
        <div class="movieinfo">
            <div class="moviename">
                {{ item.movieName }}
            </div>
            <div class="moviestar">
              
              
              
              
  <el-rate
    v-model="item.movieScore"
    disabled
    show-score
    
    text-color="#ff9900"
    :score-template="`${item.movieScore*2}分`"
    
  />


              
              
              
              
         </div>
            <div class="info">
                <div>导演：{{item.director}}</div>
           

            </div>
        </div>

    </div>
  
  </div>
  </div>
</template>





<style lang="scss" scoped>
.container{
margin:0 auto;
width: 70vw;
margin-top: 10px;
  
}
.filter-container {
  padding: 10px;
      border-radius: 20px;
      
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
    
  
}
.moviecard{
  margin-top: 20px;
  padding:20px;
  border-radius: 20px;
      
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

 .cardcontainer{
        height: 200px;
        display: flex;
        
        justify-content: flex-start;
        align-items: center;
    }
    .moviephoto{
        width: 150px;
        height: 200px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            object-fit: cover;
        }
    }
    .movieinfo{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 20px;
        .info{
            padding:10px;
            border-left: 1px solid gray;
        }
    }

</style>