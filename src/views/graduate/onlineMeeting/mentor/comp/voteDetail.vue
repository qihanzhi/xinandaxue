<template>
  投票明细
  <div class="grid_10">
    <div v-for="i in sum">
      <div class="border">{{ name[index][i] }}</div>
      <div class="border">
        <el-icon v-if="i <= yes" color="#91cc75" size="16"
          ><CircleCheckFilled
        /></el-icon>
        <el-icon v-if="i > yes" color="#953214" size="16"
          ><CircleCloseFilled
        /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  index: {
    type: Number,
    default: 0,
  },
});
const sum = ref(props.yes + props.no);
const name = [
  [
    "",
    "邵宁宁",
    "冯培红",
    "张凯",
    "罗帅",
    "梁俊英",
    "蒋景阳",
    "贾爱武",
    "刘海涛",
    "王敏",
    "张慧宇",
  ],
  [
    "",
    "王朝红",
    "冯国栋",
    "冯鑫",
    "于欣",
    "张磊",
    "刘萍",
    "张应龙",
    "吴小莉",
    "闫建强",
    "项龙元",
  ],
  [
    "",
    "陈红",
    "安婷",
    "洪正仪",
    "黄华新",
    "熊明辉",
    "廖备水",
    "杨小林",
    "白惠人",
    "徐慈华",
    "周勉",
  ],
];
</script>
<style lang="scss" scoped>
.grid_10 {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  line-height: 36px;
  font-size: 16px;
  .border {
    border: 1px solid #dfddde;
    text-align: center;
  }
}
</style>
