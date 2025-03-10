<template>
  <div class="chart-content">
    <div class="chart1" ref="chart1"></div>
    <div class="chart2" ref="chart2"></div>
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from "vue";
import useGraduateStore from "@/store/modules/graduate";
import * as echarts from "echarts";

const graduateStore = useGraduateStore();

const { proxy } = getCurrentInstance();

const chart1 = ref(null);
const chart2 = ref(null);

const schoolState = reactive({
  total: 35000,
  num1: 0,
});

const state = reactive({
  num1: 0,
  num2: 0,
  num3: 0,
  num4: 0,
  num5: 0,
});

onBeforeMount(() => {
  schoolState.num1 = graduateStore.stayData.length;
  graduateStore.stayData.forEach((item) => {
    if (item.transactionType === "学习需要") {
      state.num1++;
    } else if (item.transactionType === "科研工作") {
      state.num2++;
    } else if (item.transactionType === "实习机会") {
      state.num3++;
    } else if (item.transactionType === "家庭原因") {
      state.num4++;
    } else if (item.transactionType === "其他特殊情况") {
      state.num5++;
    }
  });
});

const chart1Init = () => {
  var chartDom = chart1.value;

  if (!chartDom) {
    return;
  }

  var myChart = echarts.init(chartDom);

  let data = [
    {
      name: "离校生",
      value: schoolState.total - schoolState.num1,
    },
    {
      name: "留校生",
      value: schoolState.num1,
    },
  ];

  var option = {
    title: {
      text: "学生留校占比",
      left: "center",
      textStyle: {
        color: "#999",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    series: [
      {
        type: "pie",
        radius: [20, 60],
        top: "10%",
        height: "100%",
        left: "center",
        width: 400,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c} 人}",
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: "#999",
            },
          },
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80,
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < myChart.getWidth() / 2;
          const points = params.labelLinePoints;
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
          };
        },
        data: data,
      },
    ],
  };

  myChart.setOption(option);
};
const chart2Init = () => {
  var chartDom = chart2.value;

  if (!chartDom) {
    return;
  }

  var myChart = echarts.init(chartDom);

  let data = [
    {
      name: "学习需要",
      value: state.num1,
    },
    {
      name: "科研工作",
      value: state.num2,
    },
    {
      name: "实习机会",
      value: state.num3,
    },
    {
      name: "家庭原因",
      value: state.num4,
    },
    {
      name: "其他特殊情况",
      value: state.num5,
    },
  ];

  var option = {
    title: {
      text: "各留校类型占比",
      left: "center",
      textStyle: {
        color: "#999",
        fontWeight: "normal",
        fontSize: 14,
      },
    },
    series: [
      {
        type: "pie",
        radius: [20, 60],
        top: "10%",
        height: "100%",
        left: "center",
        width: 400,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c} 人}",
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: "#999",
            },
          },
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80,
        },
        labelLayout: function (params) {
          const isLeft = params.labelRect.x < myChart.getWidth() / 2;
          const points = params.labelLinePoints;
          // Update the end point.
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
          };
        },
        data: data,
      },
    ],
  };

  myChart.setOption(option);
};

onMounted(() => {
  nextTick(() => {
    chart1Init();
    chart2Init();
  });
});
</script>

<style lang="scss" scoped>
.chart-content {
  display: flex;
  align-items: center;

  .chart1,
  .chart2 {
    width: 50%;
    min-width: 300px;
    height: 300px;
    padding: 10px;
  }
}
</style>
