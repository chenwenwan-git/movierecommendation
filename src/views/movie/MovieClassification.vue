<script setup>
import MovieLabel from './components/MovieLabel.vue';
import EveryMovieCard from './components/EveryMovieCard.vue';
import { ref } from 'vue'
import { RefreshLeft } from '@element-plus/icons-vue'

// 类型数据
const types = ref([
  { label: '全部', isActive: true },
  { label: '剧情', isActive: false },
  { label: '喜剧', isActive: false },
  { label: '动作', isActive: false },
  // 之后接口修改这里
    { label: '爱情', isActive: false },
    { label: '科幻', isActive: false },
    { label: '悬疑', isActive: false },
    { label: '恐怖', isActive: false },
    { label: '动画', isActive: false },
    { label: '冒险', isActive: false },
    { label: '战争', isActive: false },
    { label: '犯罪', isActive: false },
    { label: '奇幻', isActive: false },
    { label: '传记', isActive: false },
    { label: '历史', isActive: false },
    { label: '运动', isActive: false },
    { label: '家庭', isActive: false },
    { label: '音乐', isActive: false },
    { label: '西部', isActive: false },
    { label: '短片', isActive: false },
    { label: '歌舞', isActive: false },
    { label: '灾难', isActive: false },
    { label: '情色', isActive: false }
])

// 地区数据
const regions = ref([
  { label: '全部', isActive: true },
  { label: '中国大陆', isActive: false },
  { label: '美国', isActive: false },
  { label: '中国香港', isActive: false },
  // 之后接口修改这里
  { label: '中国台湾', isActive: false },
  { label: '日本', isActive: false },
  { label: '韩国', isActive: false },
  { label: '英国', isActive: false },
  { label: '法国', isActive: false },
  { label: '德国', isActive: false },
  { label: '意大利', isActive: false },
  { label: '西班牙', isActive: false },
  { label: '印度', isActive: false },
  { label: '其他', isActive: false },
  { label: '新加坡', isActive: false },
  { label: '泰国', isActive: false },
  { label: '马来西亚', isActive: false },
  { label: '澳大利亚', isActive: false },
  { label: '新西兰', isActive: false },
  { label: '俄罗斯', isActive: false },
  { label: '巴西', isActive: false },
  { label: '阿根廷', isActive: false },
    { label: '南非', isActive: false },
    { label: '瑞士', isActive: false },
    { label: '瑞典', isActive: false },
    { label: '挪威', isActive: false },
    { label: '芬兰', isActive: false },
    { label: '丹麦', isActive: false },
    { label: '荷兰', isActive: false },
    { label: '比利时', isActive: false },
    { label: '奥地利', isActive: false },
    { label: '爱尔兰', isActive: false }

])
const toggleTypeActive = (type) => {
  types.value.forEach(t => t.isActive = false)
  type.isActive = true
}
const toggleRegionActive = (region) => {
  regions.value.forEach(r => r.isActive = false)
  region.isActive = true
}
const reload = () => {
  // 重新加载逻辑，例如调用接口重新获取数据

  console.log('执行重新加载操作')
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
    <MovieLabel :items="regions" label="地区:" @toggleActive="toggleRegionActive" />
  </div>
  <div class="moviecard">
  <EveryMovieCard v-for="index in 3" :key="index" style="margin-bottom: 20px;" @click="$router.push('/movie/Detail')"></EveryMovieCard>
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
</style>