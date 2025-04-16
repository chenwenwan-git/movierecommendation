<template>

  <div class="filter-group">
    <span class="filter-label" style="flex:1">{{ label }}</span>
    <el-button-group style="flex:20">
      <el-button
        v-for="(item, index) in items"
        
        :key="index"
        :size="buttonSize"
        :type="item.isActive? 'primary' : ''"
        @click="handleToggleActive(item)"
        
      >
        {{ item.label }}
      </el-button>
    </el-button-group>
  </div>

  
</template>

<script setup>

import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['toggleActive'])

const buttonSize = 'small'

const handleToggleActive = (item) => {
  props.items.forEach(i => i.isActive = false)
  item.isActive = true
  emits('toggleActive', item)
}







</script>

<style scoped>


.filter-group {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-top: 10px;
}
.el-button{
  margin-bottom:10px;
}
.filter-label {
  margin-right: 15px;
}
</style>