<!-- 首页list组件 -->
<template>
  <div class="listCon">
    <div class="listConImgs" v-if="imgShow">
      <el-image
        style="width: 100%; height: 100%"
        :src="selected"
        v-if="selected"
        fit="none"
      />
      <img src="@/assets/images/default.png" class="h100" v-else />
    </div>
    <div class="h100">
      <div
        v-for="item in data.list"
        :key="item"
        class="newsArea"
        @mouseenter="hover(item)"
        @click="linkToExpertPage(item.id, item.title, item.sonTitle, 1)"
      >
        <el-image class="img" :src="item.img" v-if="item.img" fit="cover" />
        <!-- <img :src="item.img" class="img" v-if="item.img" /> -->
        <img
          src="@/assets/images/default.png"
          class="img"
          :style="{ backgroundColor: randomColor() }"
          v-else
        />
        <div class="title" :key="item">
          {{ item.title }}
        </div>
        <div class="time">{{ formatDateNoTime(item.createTime, ".") }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatDateNoTime } from "@/utils/index";
import { ref, getCurrentInstance, onMounted, defineProps } from "vue";
import router from "@/router";
// import { useStore } from 'vuex'
// const store = useStore()
// const menuMap = store.state.menuMap

const { proxy } = getCurrentInstance();

const props = defineProps({
  tagId: String,
  data: Object,
  img: {
    type: String,
    require: false,
    default: "",
  },
  imgShow: {
    type: Boolean,
    require: false,
    default: false,
  },
});
// 跳转详情
const linkToExpertPage = (id, name, tagId, type) => {
  return;
  const paId = menuMap[tagId].parentCode;
  let menuName = [
    {
      name: menuMap[tagId].name,
      id: paId,
      type: menuMap[tagId].type,
    },
    {
      name: menuMap[tagId].name,
      id: tagId,
      type: menuMap[tagId].type,
    },
    { name: name, id: id, type },
  ];
  store.dispatch("saveBread", menuName);
  store.commit("setKey", store.state.key + 1);
  router.push({
    path: "/textPage",
    query: {
      id: id,
      type,
      title: name,
      bread: menuName.map((item) => item.id).join(","),
    },
  });
};
const random = () => {
  return Math.floor(Math.random() * (150 - 100)) + 200;
};
const randomColor = () => {
  return "rgba(" + random() + "," + random() + "," + random() + ", 0.8)";
};
const selected = ref(props.img);
const hover = (item) => {
  selected.value = item.img;
};
onMounted(() => {});
// @import '@/styles/global.less';
</script>
<style lang="scss" scoped>
$green: #3c6fd0;
.listCon {
  display: flex;
  align-items: flex-start;
}
.h100 {
  width: 100%;
  height: 100%;
}
.newsArea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding-top: 14px;
  font-size: 15px;
  border-bottom: 1px solid rgba(29, 81, 162, 0.1);
  cursor: pointer;
  grid-template-columns: 10px;
  padding: 10px 0px;
  box-sizing: border-box;
  z-index: 1;
  position: relative;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 0px;
    background-color: rgba(29, 81, 162, 0.1);
    position: absolute;
    top: 0;
    left: 0;
    transition: height 0.4s ease;
    .title::before {
      opacity: 0.5;
    }
  }
  .img {
    width: 20px;
    height: 18px;
    margin-right: 5px;
  }

  .title {
    width: calc(100% - 120px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: $green;
      border-radius: 50%;
      margin-right: 5px;
      margin-bottom: 4px;
      vertical-align: baseline;
      opacity: 0.2;
    }
  }

  &:hover {
    color: $green;
  }

  .time {
    color: $green;
  }
}
.newsArea:hover::before {
  height: 100%;
}
// 轮播图
.listConImgs {
  width: 302px;
  height: 170px;
  margin-right: 20px;
  border-radius: 5px;
  overflow: hidden;
  background: #f1f4ff;
}
:deep(.el-carousel__container) {
  height: 100%;
}
</style>
