<script setup>
import FirstPageBox from './components/FirstPageBox.vue'
import { MovieGetHotService } from '@/api/movie'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const MovieHotList = ref([])
const router = useRouter()
const isLoading = ref(true)
const getMovieHotList = async () => {
  try {
    const res = await MovieGetHotService()

    MovieHotList.value = res.data.data
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
  }
}
getMovieHotList()
onMounted(() => {
  if (!isLoading.value) {
    MovieHotList.value = MovieHotList.value.sort((a, b) => b.movieScore - a.movieScore)
  }
})
</script>

<template>
  <div>
    <!-- 骨架屏 -->
    <template v-if="isLoading">
      <el-carousel :interval="4000" type="card" height="500px" style="width: 1380px; margin: 0 auto">
        <el-carousel-item v-for="i in 3" :key="i">
          <div class="skeleton-img"></div>
          <div class="skeleton-moviename"></div>
        </el-carousel-item>
      </el-carousel>

      <div v-loading="isLoading" style="width: 90vw;
  height: 400px;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #99a9bf;">
  </div>
    </template>
    <!-- 页面 -->
    <template v-else>
      <el-carousel
        :interval="4000"
        type="card"
        indicator-position="none"  
        arrow="always"
        height="500px"
        style="width: 1380px; margin: 0 auto"
        @change="handleCarouselChange"
      >
        <el-carousel-item
          v-for="item in MovieHotList.slice(0, 3)"
          :key="item.movie_id"
          @click="router.push({ name: 'MovieDetail', params: { movieId: item.movie_id } })"
        >
          <img
            :src="item.postUrl"
            alt="轮播图片"
            title="点击查看详情"
            style="width: 100%; height: 100%; object-fit: cover"
          />

          <div class="moviename">
            {{ item.movieName }}
          </div>
        </el-carousel-item>
      </el-carousel>

      <FirstPageBox :movieList="MovieHotList">评分最多……</FirstPageBox>
    </template>
  </div>
</template>

<style lang="scss" scoped>
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
.moviename {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(203, 203, 203, 0.598);
  text-align: center;
  color: white;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 700;
}

.active {
  background-color: red;
}

/* 骨架屏样式 */
.skeleton-image {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-moviename {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #e0e0e0;
  animation: skeleton-loading 1.5s infinite;
}
@keyframes skeleton-loading {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
</style>


