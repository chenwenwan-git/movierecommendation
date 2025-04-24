<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { getMovieById } from '@/api/movie'
import { insertUserComment } from '@/api/comment.js'
import { useUserStore } from '@/stores'

const route = useRoute()
const movieId = ref(route.params.movieId)
const input = ref('')
const dataList = ref([])
const empty = ref(false)
const isLoading = ref(false)

//获取电影详情数据
const getMovieDetailList = async (movieId) => {
  try {
    isLoading.value = true
    empty.value = false
    const res = await getMovieById(movieId)
    const data = res.data.data
    data.movieScore = Number(data.movieScore) / 2
    dataList.value = data
  } catch (error) {
    empty.value = true
  } finally {
    isLoading.value = false
  }
}
// 组件初始化时获取一次数据
getMovieDetailList(movieId.value)

//监听movieId的变化
watch(movieId, async (newmovieId) => {
  await getMovieDetailList(newmovieId)
})

//监听路由变化
watch(
  () => route.params.movieId,
  (newId) => {
    movieId.value = newId
  }
)

//反转评论列表
const getReversedComments = () => {
  if (dataList.value && dataList.value.comments) {
    return dataList.value.comments.slice().reverse()
  }
  return [] // 如果数据不存在，返回空数组，避免报错
}
const addComment = async () => {
  const userStore = useUserStore()
  const token = userStore.token
  if (!token) {
    ElMessage({
      message: '请先登陆',
      type: 'warning',
    })
    return
  }
  if (input.value === '') {
    ElMessage({
      message: '请输入评论内容',
      type: 'warning',
    })
    return
  }
  const commentDto = {
    comment: input.value,
    movieId: movieId.value,
  }
  //发请求
  await insertUserComment(commentDto, {})
  ElMessage.success('添加成功')
  input.value = ''
  getMovieDetailList(movieId.value)
}
</script>

<template>
  <el-empty v-if="empty" :image-size="300" description="抱歉，暂无数据" />
  <div v-else class="container" v-loading="isLoading">
    <div class="headerbox" :style="{ '--bg-image-url': `url('${dataList.postUrl}')` }">
      <div class="box">
        <div class="info w">
          <div class="movie-poster">
            <img :src="dataList.postUrl" alt="" />
          </div>

          <div class="movie-info">
            <div class="out">
              <h2 class="movie-title">{{ dataList.movieName }}</h2>
              <div class="movie-rating">
                <el-rate
                  v-model="dataList.movieScore"
                  disabled
                  show-score
                  text-color="#ff9900"
                  :score-template="`${dataList.movieScore * 2}分`"
                />
              </div>
            </div>
            <div class="inner" style="margin-top: 20px">
              <div class="d">导演：{{ dataList.director }}</div>
              <div class="d">演员：{{ dataList.actors }}</div>
              <div class="d">简介：{{ dataList.plotSummary }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment w">
      <div style="font-weight: 500; font-size: 20px; margin-top: 40px">评论区</div>
      <div class="my-comment">
        <el-avatar :size="50" :src="avatar" style="margin-right: 10px" />
        <el-input
          v-model="input"
          style="height: 50px"
          placeholder="请输入评论"
          @keyup.enter="addComment"
        />
      </div>

      <div class="comment-card" style="margin-top: 40px; margin-left: 5px">
        <div
          v-for="(item, index) in getReversedComments()"
          :key="index"
          style="margin-bottom: 20px"
        >
          <div
            style="
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-bottom: 10px;
            "
          >
            <el-avatar
              :size="40"
              style="margin-right: 10px"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span>{{ item.username }}</span>
          </div>
          <div class="comment-text" style="margin-left: 50px">{{ item.comment }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container{
  width: 100vw;
  
}
.headerbox {
  width: 100%;
  height: 500px;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.headerbox::before {
  content: '';

  background-image: var(--bg-image-url);
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  position: absolute;

  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
.movie-poster {
  width: 300px;
  height: 420px;

  margin-top: -190px;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    max-width: 100%;
  }
}

.d {
  margin-bottom: 10px;
}
.box {
  height: 53%;
  position: absolute;
  bottom: -3%;
  width: 100%;

  background-color: rgba(95, 155, 138, 0.7);
}

.comment{
  min-height: 400px;
}
.w {
  margin: 0 auto;
  width: 70vw;
}
.info {
  color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.movie-title {
  margin-top: 0;
}

.out {
  height: 80px;
  position: absolute;
  top: -80px;
}
.movie-info {
  flex: 1;
}

.my-comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.comment-text::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background-color: rgb(235, 235, 235);
  margin-top: 15px;
}
</style>