<template>
  <div class="app-container">
    <div class="top-total-container card">
      <div class="cell">
        <span class="title">在校人数：</span>
        <span class="value">{{ schoolState.total - schoolState.num1 }}</span>
        <span class="unit"> 人</span>
      </div>
      <div class="cell">
        <span class="title">请销假人数：</span>
        <span class="value">{{ schoolState.num1 }}</span>
        <span class="unit"> 人</span>
      </div>
    </div>
    <div class="module-container">
      <p class="title">请销假统计</p>
      <div class="content card">
        <Statistic></Statistic>
      </div>
    </div>
    <div class="module-container">
      <p class="title">请销假申请</p>
      <div class="content card">
        <ApplyTable></ApplyTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";

import { selectToLabel, guid } from "@/utils/form";

import useStudentInfoCommon from "../common";
import useGraduateStore from "@/store/modules/graduate";
import { storeToRefs } from "pinia";

import TableDetail from "./detail.vue";
import { encryptPhone } from "@/utils/validate";

import ApplyTable from './table.vue'
import Statistic from './statistic.vue'

const { dics, getIndexByAttr } = useStudentInfoCommon();
const graduateStore = useGraduateStore();

const { proxy } = getCurrentInstance();

const schoolState = reactive({
  total: 35000,
  num1: 200,
});

onBeforeMount(() => {
  schoolState.num1 = graduateStore.absentData.length;
});
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10.5px;
  background: rgba(255, 255, 255, 0.7);
}

.module-container {
  margin: 20px 0px;

  .title {
    margin-bottom: 20px;
  }
}

.top-total-container {
  display: flex;
  align-items: center;
  padding: 20px 50px;
  .cell {
    display: flex;
    align-items: center;
    line-height: 42px;
    margin-right: 100px;

    .title {
      font-size: 14px;
      margin-right: 10px;
    }
    .value {
      font-size: 24px;
    }
    .unit {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
</style>
