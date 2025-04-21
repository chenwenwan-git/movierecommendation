<script setup>
import { ref } from 'vue'
import {Edit,Delete,InfoFilled } from '@element-plus/icons-vue'
import { getUserComment } from '@/api/comment.js'

import CommentDialog from './components/CommentDialog.vue';  

const commentData = ref([])
const loading = ref(false)
const getCommentList = async () => {
  loading.value = true
  const res = await getUserComment({})
  commentData.value = res.data.data
  loading.value = false
}
getCommentList({})
const dialog = ref()






const viewDetails = (row,value) => {
  
  dialog.value.open(row,value)
};

const changeSuccess = ()=>{
        getCommentList({})
}

const editReview = async(row,value) => {
       
  
  dialog.value.open(row,value)
  //每次取消之后重新发请求吗


};


const deleteReview = (row) => {
  
};
</script>

<template>
    
    <!-- 添加空状态 -->
  <!-- <el-empty v-if="!commentData.value" description="暂无评论数据"></el-empty> -->
  <el-table  :data="commentData" v-loading="loading" style="width: 100%" stripe>
  
  
    <el-table-column align="center" prop="movieName" label="电影" />
    <!-- <el-table-column align="center" prop="movieName" label="评分" /> -->
    <el-table-column label="评语" align="center">
      <template #default="scope">
        <el-button type="default" size="big" @click="viewDetails(scope.row,false)">查看详情</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" label="评论人" >
    <template #default>
      chen
      <!-- 这里先固定  -->
    </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" :icon="Edit" circle @click="editReview(scope.row,true)"/>
 

   <el-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    :icon="InfoFilled"
    icon-color="#626AEF"
    placement="right"
    title="确定删除该电影的评价吗？"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <el-button type="danger" :icon="Delete" circle @click="deleteReview(scope.row)"/>
    </template>
  </el-popconfirm>
        
      </template>
    </el-table-column>
  </el-table>
  

<!-- 弹窗 -->
<CommentDialog ref="dialog" @success="changeSuccess"></CommentDialog>





</template>

<style lang="scss" scoped>

</style>