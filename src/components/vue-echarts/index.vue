<template>
  <div class="echarts" ref="root"></div>
</template>

<script>
import { watch, onMounted, shallowRef } from "vue";
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
    let chart;
    const root = shallowRef(); // 也可以用 uuid 解决，dom 中class重复的问题
    const initChart = () => {
      if (!root.value) {
        return;
      }
      if(!chart) {
        chart = Echarts.init(root.value, ctx.theme);
      }
      ctx.options && chart.setOption(ctx.options);
    }
    onMounted(() => {
      initChart();
    });
    watch(() => ctx.options, () => {
      initChart();
    });
    return{
      root
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>