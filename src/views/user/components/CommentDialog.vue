<script setup>
import { ref } from 'vue'
import { updateUserComment } from '@/api/comment.js'
const dialogVisible = ref(false)
const viewOredit = ref()
const form = ref()
const emit = defineEmits(['success'])
const open = async (row,value) => {
  dialogVisible.value = true
  viewOredit.value = value
    //使用深拷贝解决双向绑定的问题
  formModel.value = JSON.parse(JSON.stringify({ ...row }))
  
}



const formModel = ref({
  movieName: '',
  comment: []
})
const rules = {

  comment: [
    { required: true, message: '请输入评论', trigger: 'blur' },
    
  ]
}

//todo:暂时不知道如何解决多个评论的问题
const change = async(commentId,comment)=>{
    await form.value.validate()
    await updateUserComment(commentId,comment,{})
    console.log('修改成功')
    ElMessage.success('修改成功')
    //如何重新渲染数据
    // 发送emit到父组件
      emit('success')

}
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="viewOredit?'修改评论':'评论详情'" width="30%">
    <div>
<el-form
  :model="formModel"
  :rules="rules"
  ref="form"
  label-width="100px"
  style="padding-right: 30px"
>
  <el-form-item label="电影名称">
    <el-input
      v-model="formModel.movieName"
      disabled
      minlength="1"
      maxlength="10"
    ></el-input>
  </el-form-item>
  <el-form-item  prop="comment" v-for="(item,index) in formModel.comment" :key="item.commentId" :label="`评论${index+1}`">
   <div style="display: flex;justify-content: space-between;width: 100%;">
    <el-input
      v-model="item.comment"
      minlength="1"
      :disabled="!viewOredit"
      maxlength="15"
    ></el-input>
    <el-button v-if="viewOredit" style="margin-left: 10px;" type="primary" @click="change(item.commentId,item.comment)"> 确认修改 </el-button>
    </div>
  </el-form-item>
</el-form>

    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        
      </span>
    </template>
  </el-dialog>
</template>