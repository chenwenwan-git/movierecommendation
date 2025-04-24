<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  movieList: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="container">
    <div class="header">
      <slot></slot>
    </div>

    <div class="content">
      <div class="every-movie-box" v-for="(item, index) in props.movieList" :key="item.movie_id">
        <div style="flex: 1; display: flex; justify-content: flex-start; align-content: flex-start">
          <h2>{{ index + 1 }}</h2>
          <div class="movie-poster">
            <img :src="item.postUrl" />
          </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            flex: 3;
          "
        >
          <div class="info">
            <h1 class="movie-title">{{ item.movieName }}</h1>
            <div class="movie-rating">
              <div style="font-size: 20px">总评分</div>
              <div style="font-size: 30px; font-weight: 700">{{ item.movieScore }}</div>
            </div>
          </div>
          <el-button
            round
            color="rgb(95, 155, 138)"
            size="large"
            style="color: white; font-size: 20px; margin-bottom: 10px"
            @click="router.push({ name: 'MovieDetail', params: { movieId: item.movie_id } })"
            >查看详情</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 85vw;
  /* height: 600px; */
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px;
}
.header {
  margin-top: 20px;
  height: 50px;
  width: 100%;
  font-size: 30px;
  color: red;
  font-weight: bold;
  text-align: left;
}
.content {
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  /* overflow: hidden; */
  margin-bottom: 20px;
}

.every-movie-box {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  h2 {
    font-weight: 700;
    margin-right: 20px;
  }
  .movie-poster {
    width: 350px;
    height: 250px;
    margin-right: 20px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    // flex:3;
  }
}
.movie-rating {
  height: 70px;
  width: 70px;
  background-color: rgb(95, 155, 138);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.every-movie-box:nth-child(2n) h2 {
  color: gray;
}

.every-movie-box:nth-child(2n + 1) h2 {
  color: rgb(238, 199, 93);
}
</style>