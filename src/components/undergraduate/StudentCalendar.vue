<!-- 统一标题组件 -->
<template>
  <div class="calendar-con">
    <el-table :data="tableData" height="530" border style="width: 100%" :span-method="objectSpanMethod">
      <el-table-column
        :prop="c.prop"
        :label="c.name"
        :width="c.width || 'auto'"
        v-for="c in cloumns"
        :key="c.prop"
      />
    </el-table>
  </div>
</template>
<script setup>
const cloumns = ref([
  { name: "午别", prop: "field__1",width:60 },
  { name: "节次/星期", prop: "field_0", width: 120 },
  { name: "星期一", prop: "field_1" },
  { name: "星期二", prop: "field_2" },
  { name: "星期三", prop: "field_3" },
  { name: "星期四", prop: "field_4" },
  { name: "星期五", prop: "field_5" },
  { name: "星期六", prop: "field_6" },
  { name: "星期天", prop: "field_7" },
]);
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}) => {
  if (columnIndex === 0) {
    if (rowIndex===0 ||rowIndex===5||rowIndex===10) {
      return {
        rowspan: 4,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}
const tableData = ref([
  {
    field__1: "上午",
    field_0: "第一节 . .(08:00-08:45)",
    field_1: "微生物学基础(1-301)",
    field_2: "",
    field_3: "工程制图(2-204)",
    field_4: "工程制图(1-502)",
    field_5: "",
  },
  {
    field_0: "第二节 . .(08:55-09:40)",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
  },
  {
    field_0: "第三节 . .(10:00-10:45)",
    field_1: "",
    field_2: "控制理论(1-301)",
    field_3: "微生物学基础(1-502)",
    field_4: "工程制图(2-204)",
    field_5: "微生物学基础(1-502)",
  },
  {
    field_0: "第四节 . .(10:55-11:40)",
    field_1: "线性代数(1-302)",
    field_2: "控制理论(1-301)",
    field_3: "工程制图(1-502)",
    field_4: "",
    field_5: "工程制图(1-502)",
  },
  {},
  {
    field__1: "下午",
    field_0: "第五节 . .(14:00-14:45)",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
  },
  {
    field_0: "第六节 . .(14:55-15:40)",
    field_1: "",
    field_2: "",
    field_3: "控制理论(1-301)",
    field_4: "",
    field_5: "",
  },
  {
    field_0: "第七节 . .(16:00-16:45)",
    field_1: "工程制图(1-502)",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
  },
  {
    field_0: "第八节 . .(16:55-17:40)",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "微生物学基础(1-502)",
    field_5: "",
  },
  {},
  {
    field__1: "晚上",
    field_0: "第九节 . .(19:00-19:45)",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
  },
  {
    field_0: "第十节 . .(19:55-20:40)",
    field_1: "",
    field_2: "工程测量学(1-301)",
    field_3: "",
    field_4: "",
    field_5: "",
  },
]);
onMounted(() => {});
</script>
<style lang="scss" scoped>
$green: #3c6fd0;
</style>
