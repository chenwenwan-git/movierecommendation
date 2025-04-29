<script setup>
import { ref } from 'vue'
import { RefreshLeft } from '@element-plus/icons-vue'
import { cateMovies } from '@/api/movie'
import { useRouter } from 'vue-router'

const router = useRouter()
const filterType = ref('0')
const cateMovieList = ref([])
const loading = ref(false)

const getCateMovieList = async (value) => {
  loading.value = true
  const res = await cateMovies(value)
  const newData = res.data.data.map((item) => {
    item.movieScore = +item.movieScore / 2 // 用+操作符强制转换
    return item
  })
  cateMovieList.value = newData
  loading.value = false
}
getCateMovieList(filterType.value)


const reload = () => {
  // 重新加载逻辑，调用接口重新获取数据
  //将类型按钮重置为“全部”
  filterType.value = '0'
  // 调用获取电影列表的函数，传入“全部”类型的value
  getCateMovieList(filterType.value)
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
      <div class="filter-group">
        
      <span style="flex:1;margin-right: 15px;font-size: 17px;">
        类型：
      </span>
       <el-radio-group v-model="filterType" size="large" style="flex:20;margin-bottom: 10px;" @change="getCateMovieList">
      <el-radio-button label="全部" value="0" />
      <el-radio-button label="动作" value="1" />
      <el-radio-button label="悬疑" value="2" />
      <el-radio-button label="科幻" value="3" />
      <el-radio-button label="励志" value="4" />
      <el-radio-button label="动画" value="5" />
      <el-radio-button label="惊悚" value="6" />
    </el-radio-group>
    </div>
    </div>

    <div class="moviecard" v-loading="loading">
      <div
        class="cardcontainer"
        v-for="item in cateMovieList"
        :key="item.movie_id"
        @click="goToMovieDetail(item.movie_id)"
      >
        <div class="moviephoto">
          <img :src="item.postUrl" alt="" />
        </div>
        <div class="movieinfo">
          <div style="display: flex;justify-content: space-between; align-items: center; width: 100%;">
          <div class="moviename">
            {{ item.movieName }}
          </div>
          <div class="moviestar">
            <el-rate
              v-model="item.movieScore"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="`${item.movieScore * 2}分`"
            /></div>
          </div>
          <div class="info">
            <div>导演：{{ item.director }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-backtop :right="80" :bottom="80" />

</template>


<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 70vw;
  margin-top: 10px;
}
.filter-container {
  padding: 10px;
  border-radius: 20px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.filter-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 15px;
}
.moviecard {
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
 display: flex; 
  flex-wrap: wrap; 
  justify-content: space-between; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cardcontainer {
  margin-bottom: 40px;
  cursor: pointer;
  height: 300px;
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  align-items: flex-start;
  transition: all 0.5s;
  padding:5px;
  
}


.cardcontainer:hover{ //鼠标悬停时激活
  
  transition: 0.5s; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.05); 
  border-radius: 10px;
  
}
.moviephoto {
  width: 350px;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
}
.movieinfo {
  width:350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  // background: linear-gradient(to right, rgb(95, 155, 138,.2), #ffffff);

  .info {
    padding: 10px;
    position: relative;
  }
  .info::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%); // 垂直居中
    width: 1px;
    height: 60%;
    background-color: rgb(188, 188, 188);
  }
}
</style>