<template>
  <div class="app-container">
    <div class="left">
      <div class="content">
        <Con1 :formData="detailState.formData" @submit="detailChange"></Con1>
      </div>
    </div>
    <div class="center">
      <el-button @click="preview">预览</el-button>
    </div>
    <div class="right">
      <div
        class="preview-box"
        v-show="state.show"
        :style="{ '--color': detailState.formData.color || '#ccc' }"
      >
        <div class="bg-img" v-if="detailState.formData.bgImg">
          <img :src="detailState.formData.bgImg" />
        </div>
        <div class="poster-container">
          <div class="row1 column">
            <div class="label">论文题目</div>
            <div class="label center">答辩人</div>
            <div class="label center">指导老师</div>
          </div>
          <div class="mt10">
            <div class="row2">
              <div>基于互动体验的地铁艺术地域化特征研究</div>
              <div class="center">王文德</div>
              <div class="center">杨 坤</div>
            </div>
            <div class="row2">
              <div>基于建筑设计xxx特征研究</div>
              <div class="center">孙禅军</div>
              <div class="center">王文涛</div>
            </div>
            <div class="row2">
              <div>基于建筑设计xxx特征研究</div>
              <div class="center">孙禅军</div>
              <div class="center">王文涛</div>
            </div>
          </div>
          <div class="row3">
            <div class="label">答辩组长：</div>
            <div class="value">赵xx，xxx大学 教授</div>
          </div>
          <div class="mt10">
            <div class="row4">
              <div class="label">答辩委员：</div>
              <div class="value">张xx，xxx大学 副教授</div>
            </div>
            <div class="row4">
              <div class="label"></div>
              <div class="value">刘xx，xxx大学 副教授</div>
            </div>
            <div class="row4">
              <div class="label"></div>
              <div class="value">王xx，xxx大学 副教授</div>
            </div>
          </div>
          <div class="row5">
            <div class="label">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：</div>
            <div class="value">2024年12月5日上午8点30分</div>
          </div>
          <div class="row6">
            <div class="label">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</div>
            <div class="value">西南科技大学xx教1楼302</div>
          </div>
          <div class="row7 mt10">
            <div class="con1">建筑与城市规划学院</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Con1 from "./con1.vue";

const detailState = reactive({
  formData: {
    bgImg:
      import.meta.env.VITE_APP_BASE_API +
      "/profile/upload/2024/12/03/论文答辩会展板海报_20241203142030A006.jpg",
    color: "#2AC250",
  },
});

const detailChange = (data) => {
  detailState.formData = { ...data };
};

const state = reactive({
  show: false,
});

const preview = () => {
  state.show = true;
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10.5px;
  background: rgba(255, 255, 255, 0.7);
}

.app-container {
  display: flex;
  align-items: center;
  height: 100%;

  .left,
  .right {
    width: calc(50% - 50px);
    height: 750px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
  }
  & > .center {
    margin: 0 20px;
  }
}

.preview-box {
  position: relative;
  width: 650px;
  height: 100%;
  overflow: hidden;
  color: var(--color);
  margin: 0 auto;

  .bg-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
    }
  }

  .poster-container {
    position: relative;
    z-index: 1;
    padding: 50px;
    .row1,
    .row2 {
      display: grid;
      grid-template-columns: 300px 100px 100px;
    }

    .row1 {
      margin-top: 120px;
      font-weight: 600;
      .center {
        text-align: center;
      }
    }
    .row2 {
      .center {
        text-align: center;
      }
    }
    .row3,
    .row4 {
      display: grid;
      grid-template-columns: 100px auto;
      line-height: 24px;

      .label {
        font-size: 18px;
      }
    }
    .row3 {
      margin-top: 50px;
    }
    .row4 {
      margin-top: 10px;
    }

    .row5,
    .row6 {
      display: grid;
      grid-template-columns: 100px auto;
      line-height: 24px;

      .label {
        font-size: 18px;
      }
    }
    .row5 {
      margin-top: 100px;
    }
    .row6 {
      margin-top: 10px;
    }

    .row7 {
      display: flex;
      justify-content: flex-end;
      .con1 {
        display: flex;
        justify-content: flex-end;
        color: #fff;
        line-height: 24px;
        padding: 5px 20px;
        
        background: var(--color);
      }
    }
  }
}
</style>
