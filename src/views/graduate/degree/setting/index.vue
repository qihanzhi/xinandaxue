<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="预答辩" name="first">
        <Con1></Con1>
      </el-tab-pane>
      <el-tab-pane label="论文查重" name="second">
        <Con2></Con2>
       </el-tab-pane>
      <el-tab-pane label="评阅" name="third"> 
        <Con3></Con3>
      </el-tab-pane>
      <el-tab-pane label="答辩" name="fourth"> 
        <Con4></Con4>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Con1 from './con1.vue'
import Con2 from './con2.vue'
import Con3 from './con3.vue'
import Con4 from './con4.vue'

const activeName = ref("first");

const handleClick = (tab) => {};
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
}
</style>
