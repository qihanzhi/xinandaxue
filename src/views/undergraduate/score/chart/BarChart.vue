<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header
            >
            <div class="title mb10">
              <div class="left">
                <Monitor
                  style="width: 1em; height: 1em; vertical-align: middle"
                />基本分析
              </div>
              <el-select
                v-model="commandstatsIntanceField"
                placeholder="请选择"
                @change="randomData"
              >
                <el-option
                  v-for="item in commandstatsIntanceFieldOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            </template
          >
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">人数</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      4
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">最低分</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ data.map(d=>d[commandstatsIntanceField]).sort((a,b)=>a-b)[0] }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">最高分</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ data.map(d=>d[commandstatsIntanceField]).sort((a,b)=>b-a)[0] }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">平均分</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ data.map(d=>d[commandstatsIntanceField]).reduce((p, c)=>p+c)/4 }}                      
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">及格率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ data.filter(d=>d[commandstatsIntanceField]>=60).length/4*100}}%
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">优秀率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      {{ data.filter(d=>d[commandstatsIntanceField]>=80).length/4*100}}%
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">标准差</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      -
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">偏度</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      -
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">峰度</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      -
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">考试信度</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="cache.info">
                      100%
                    </div>
                  </td>
                </tr>                
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <template #header>
            <div class="title mb10">
              <div class="left">
                <PieChart
                  style="width: 1em; height: 1em; vertical-align: middle"
                />成绩区间统计
              </div>
              <el-select
                v-model="commandstatsIntanceField"
                placeholder="请选择"
                @change="randomData"
              >
                <el-option
                  v-for="item in commandstatsIntanceFieldOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="commandstats" style="height: 420px" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <template #header
            ><div class="title mb10">
              <div class="left">
                <PieChart
                  style="width: 1em; height: 1em; vertical-align: middle"
                />成绩分布
              </div>
              <el-select
                v-model="usedmemoryInstanceField"
                placeholder="请选择"
                @change="randomData2"
              >
                <el-option
                  v-for="item in usedmemoryInstanceFieldOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="usedmemory" style="height: 420px" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Cache">
import * as echarts from "echarts";

const cache = ref([]);
const commandstats = ref(null);
const usedmemory = ref(null);
const { proxy } = getCurrentInstance();
// 成绩分析
const commandstatsIntanceField = ref("field_3");
const commandstatsIntanceFieldOptions = ref([
  { value: "field_3", label: "平时" },
  { value: "field_4", label: "期中" },
  { value: "field_4", label: "实验" },
  { value: "field_5", label: "期末" },
  { value: "field_6", label: "总评" },
]);
let commandstatsIntanceData = [
  { name: "80分以上", value: 0 },
  { name: "60分以上", value: 0 },
  { name: "不及格", value: 0 },
];
let data = ref([
  {
    field_0: "自动化1班",
    field_1: "202009001",
    field_2: "王大海",
    field_3: 84,
    field_4: 67,
    field_5: 42,
    field_6: 78,
    field_7: 67,
    field_8: "",
    field_9: "#ff4500",
  },
  {
    field_0: "自动化1班",
    field_1: "202009002",
    field_2: "李万和",
    field_3: 60,
    field_4: 54,
    field_5: 71,
    field_6: 77,
    field_7: 76,
    field_8: "",
  },
  {
    field_0: "自动化1班",
    field_1: "202009003",
    field_2: "赵天河",
    field_3: 67,
    field_4: 34,
    field_5: 78,
    field_6: 67,
    field_7: 69,
    field_8: "",
  },
  {
    field_0: "自动化1班",
    field_1: "202009004",
    field_2: "孙禅",
    field_3: 45,
    field_4: 76,
    field_5: 89,
    field_6: 87,
    field_7: 63,
    field_8: "",
  },
]);
function randomData() {
  commandstatsIntanceData = [
    { name: "80分以上", value: 0 },
    { name: "60分以上", value: 0 },
    { name: "不及格", value: 0 },
  ];
  const commandstatsIntance = echarts.init(commandstats.value, "macarons");
  data.value.forEach((d) => {
    if (d[commandstatsIntanceField.value] > 80) {
      commandstatsIntanceData[0].value++;
    } else if (d[commandstatsIntanceField.value] > 60) {
      commandstatsIntanceData[1].value++;
    } else if (d[commandstatsIntanceField.value] > 0) {
      commandstatsIntanceData[2].value++;
    }
  });

  commandstatsIntance.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    series: [
      {
        name: "成绩",
        type: "pie",
        radius: [15, 95],
        center: ["50%", "38%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: commandstatsIntanceData,
        animationEasing: "cubicInOut",
        animationDuration: 1000,
      },
    ],
  });
}
// 成绩分布
let response = {
  data: {
    info: { used_memory_human: "成绩峰值" },
    commandStats: [10, 34, 64, 24, 78],
  },
};
const usedmemoryInstanceField = ref("bar");
const usedmemoryInstanceFieldOptions = ref([
  { value: "bar", label: "柱状图" },
  { value: "line", label: "折线图" },
]);
function randomData2() {
  const usedmemoryInstance = echarts.init(usedmemory.value, "macarons");
  usedmemoryInstance.setOption({
    tooltip: {},
    legend: {},
    dataset: {
      source: [
        ["学生", "平时", "期中", "实验", "期末", "总评"],
        ["王大海", "84", "67", "42", "78", "67"],
        ["李万和", "60", "54", "71", "77", "76"],
        ["赵天河", "67", "34", "78", "67", "69"],
        ["孙禅", "45", "76", "89", "87", "63"],
      ],
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: usedmemoryInstanceField.value }, { type: usedmemoryInstanceField.value }, { type: usedmemoryInstanceField.value }],
  });
}
function getList() {
  proxy.$modal.loading("正在加载缓存监控数据，请稍候！");
  proxy.$modal.closeLoading();
  cache.value = response.data;
  randomData();
  randomData2();
  window.addEventListener("resize", () => {
    // commandstatsIntance.resize();
    // usedmemoryInstance.resize();
  });
}
onMounted(() => {
  nextTick(() => {
    getList();
  });
});
</script>
<style lang="scss" scoped>
.card-box {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 200px;
    }
  }
}
</style>
