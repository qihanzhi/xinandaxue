<template>
  <div class="chart-content">
    <div class="chart1" ref="chart1"></div>
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
} from "vue";
import * as echarts from "echarts";


const { proxy } = getCurrentInstance();

const chart1 = ref(null);

const props = defineProps({
  ruleForm: {
    require: true,
    default: {}
  }
})



onBeforeMount(() => {
  
});

const chart1Init = () => {
  var chartDom = chart1.value;

  if (!chartDom) {
    return;
  }

  var myChart = echarts.init(chartDom);

  let data = [
    {
      name: "通过",
      value: props.ruleForm.passNum,
    },
    {
      name: "不通过",
      value: props.ruleForm.voteTotal - props.ruleForm.passNum,
    },
  ];

  var option = {
    title: {
      text: "会审通过率占比",
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
        width: 300,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c} 票}",
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
  })
  
});
</script>

<style lang="scss" scoped>
.chart-content {
 width: 100%;

  .chart1 {
    width: 50%;
    min-width: 300px;
    height: 300px;
    padding: 10px;
  }
}
</style>
