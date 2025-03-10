<template>
  <el-button type="primary" :disabled="show" @click="submitForm">发起投票</el-button>
  <div class="mt20">投票人员</div>
  <div class="grid_10">
    <div v-for="i in sum">
      <div class="border">{{ name[index][i] }}</div>
    </div>
  </div>
  <el-progress v-if="show" :percentage="percentage" :color="colors" />
</template>
<script setup>
const emits = defineEmits(["update"]);
const show = ref(false);
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
const colors = [
  { color: "#f56c6c", percentage: 20 },
  { color: "#e6a23c", percentage: 40 },
  { color: "#5cb87a", percentage: 60 },
  { color: "#1989fa", percentage: 80 },
  { color: "#6f7ad3", percentage: 100 },
];
const percentage = ref(0);
function submitForm() {
  show.value = true;
  let timer = setInterval(() => {
    percentage.value = (percentage.value % 100) + 10;
    if (percentage.value >= 100) {
      clearInterval(timer);
      emits("update");
    }
  }, 500);
}
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
