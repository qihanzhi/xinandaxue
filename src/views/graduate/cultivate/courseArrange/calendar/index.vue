<template>
  <div class="app-container">
    <div class="calendar-container">
      <div class="left">
        <p class="title">2024-2025第1学期</p>
        <CalendarOne></CalendarOne>
      </div>
      <div class="right">
        <p class="title">2024-2025第2学期</p>
        <CalendarTwo></CalendarTwo>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, onBeforeMount, onUnmounted, ref } from "vue";

const CalendarOne = defineAsyncComponent(() => import('./calendarOne.vue'));
const CalendarTwo = defineAsyncComponent(() => import('./calendarTwo.vue'));




</script>

<style lang="scss" scoped>
.calendar-container {
  min-height: calc(100vh - 100px);
  width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 10px;

  .title {
    line-height: 32px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 600;
  }
}
</style>
