<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
import resize from "../../cultivate/achievement/chart/mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        color: ["#91cc75", "#953214"],
        legend: {
          left: "center",
          bottom: "10",
          data: ["同意", "反对"],
        },
        series: [
          {
            name: "投票结果",
            type: "pie",
            roseType: "radius",
            radius: [15, 90],
            center: ["50%", "38%"],
            data: [
              { value: this.random(4, 32), name: "同意" },
              { value: this.random(0, 5), name: "反对" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>
