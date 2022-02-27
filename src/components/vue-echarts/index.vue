<template>
  <div class="echarts"></div>
</template>

<script>
import { watch, onMounted } from "vue";
import Echarts from "echarts";

export default {
  name: "GVueEcharts",
  props: {
    options: {
      type: Object,
    },
    theme: {
      type: String,
      default: 'light',
    }
  },
  setup(ctx) {
    let dom;
    let chart;
    const initChart = () => {
      if(!chart) {
        dom = document.querySelector('.echarts');
        chart = Echarts.init(dom, ctx.theme);
      }
      ctx.options && chart.setOption(ctx.options);
    }
    onMounted(() => {
      initChart();
    });
    watch(() => ctx.options, () => {
      initChart();
    });
    return{}
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>