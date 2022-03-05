<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: actualConfig.headerBg,
        height: `${actualConfig.headerHeight}px`,
        fontSize: `${actualConfig.headerFontSize}px`,
        color: actualConfig.headerColor
      }"
    >
      <div
        class="base-scroll-list-header-item base-scroll-list-header-text"
        v-for="(h, i) in header"
        :key="h + i"
        :style="{
          width: `${columnWidth[i]}px`,
          ...headerStyle[i],
        }"
        v-html="h"
        :align="aligns[i] ?? 'center'"
      />
    </div>
    <div
      class="base-scroll-list-rows-wrapper"
      :style="{
        height: `${height - actualConfig.headerHeight}px`
      }"
    >
      <div
        class="base-scroll-list-rows"
        v-for="(r, i) in currentRowData"
        :key="r.rowIndex"
        :style="{
          height: `${rowHeight[i]}px`,
          lineHeight: `${rowHeight[i]}px`,
          backgroundColor: r.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
          fontSize: `${actualConfig.rowFontSize}px`,
          color: actualConfig.rowColor
        }"
      >
        <div
          class="base-scroll-list-rows-item"
          v-for="(c, j) in r.data"
          :key="c + j"
          :style="{
            width: `${columnWidth[j]}px`,
            ...rowStyle[j],
          }"
          v-html="c"
          :align="aligns[j] ?? 'center'"
        ></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { watch, onMounted, ref } from "vue";
import { v4 as uuidv4} from 'uuid';
import useScreen from '../../hooks/useScreen';
import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';

const defaultConfig = {
  // 标题数据
  header: [],
  // 标题样式
  headerStyle: [],
  // 标题背景色
  headerBg: 'rgb(90, 90, 90)',
  // 标题高度
  headerHeight: 35,
  // 标题的序号
  headerIndex: false,
  // 标题的序号内容
  headerIndexContent: '#',
  headerIndexData: [],
  // 标题的序号样式
  headerIndexStyle: {
    width: '80px',
  },
  // 数据对象
  data: [],
  // 显示行数
  rowNum: 10,
  // 行样式
  rowStyle: [],
  // 行标题样式
  rowIndexStyle: {
    width: '80px',
  },
  // 行背景色
  rowBg: ['rgb(40, 40, 40)', 'rgb(55, 55, 55)'],
  // 居中方式
  aligns: [],
  // 行标题的字体大小
  headerFontSize: 28,
  // 数据行的字体大小
  rowFontSize: 28,
  // 行标题的字体颜色
  headerColor: '#fff',
  // 数据行的字体颜色
  rowColor: '#000',
  // 每次移动的行数
  moveNum: 1,
  // 动画间隔时间
  duration: 2000,
};
export default {
  name: "GBaseScrollList",
  props: {
    config: {
      type: Object,
      default: (v) => {}
    }
  },
  setup(ctx) {
    const id = `base-scroll-list-${uuidv4()}`;
    const { width, height } = useScreen(id);
    const actualConfig = ref({});
    const header = ref(ctx?.config?.header ?? []);
    const headerStyle = ref(ctx?.config?.headerStyle ?? []);
    const columnWidth = ref([]);
    const rowsData = ref(ctx?.config?.data ?? []);
    const currentRowData = ref([]);
    const rowHeight = ref([]);
    const rowStyle = ref(ctx?.config?.rowStyle ?? []);
    const rowBg = ref(ctx?.config?.rowBg ?? []);
    const aligns = ref(ctx?.config?.aligns ?? []);
    const currentIndex = ref(0); // 动画指针
    const isAnimationStart = ref(true);

    let agvHeight; // 行高
    const handleHeader = (config) => {
      const _headerData = cloneDeep(config?.header);
      const _headerStyle = cloneDeep(config?.headerStyle);
      const _aligns = cloneDeep(config?.aligns);
      
      // 处理 header 中的序号和样式
      if(config?.header?.length && config.headerIndex) {
        _headerData.unshift(config?.headerIndexContent);
        _headerStyle.unshift(config?.headerIndexStyle);
        _aligns.unshift('center');
        
      }
      // 动态计算 header 中每一列的宽度
      let usedWidth = 0;
      let useColumnNum = 0;
      // 判断是否自定义width
      _headerStyle.forEach(s => {
        // 如果自定义width，则按照自定义width进行渲染
        if(s.width) {
          usedWidth += parseFloat(s.width);
          useColumnNum++;
        }
      });
      // 动态计算列宽度时，使用剩余的宽度除以剩余的列数
      const avgWidth = (width.value - usedWidth) / (_headerData.length - useColumnNum); // 每一列的宽度
      const _columnWidth = new Array(_headerData.length).fill(avgWidth);
      _headerStyle.forEach((s, i) => {
        if(s.width) {
          const headerWidth =parseFloat(s.width);;
          _columnWidth[i] = headerWidth;
        }
      });
      header.value = _headerData;
      headerStyle.value = _headerStyle;
      aligns.value = _aligns;
      columnWidth.value = _columnWidth;
    }
    const handleRows = (config) => {
      let _rowData = cloneDeep(config?.data);
      const _rowStyle = cloneDeep(config?.rowStyle);
      let { headerHeight, rowNum } = config;
      // 处理 row 中的序号
      if(config?.data?.length && config.headerIndex) {
        _rowData.forEach((row, i) => {
          if(config?.headerIndexData?.length > 0 && config?.headerIndexData[i]) {
            row.unshift( config?.headerIndexData[i]);
          } else {
            row.unshift(i + 1);
          }
        });
        _rowStyle.unshift(config?.rowIndexStyle);
      }
      if(_rowData.length >= rowNum && _rowData.length < rowNum * 2) {
        _rowData = [..._rowData, ..._rowData];
      }
      rowsData.value = _rowData.map((v, i) => ({
        data: v,
        rowIndex: i,
      }));
      // 动态计算列高度
      const unusedHeight = height.value - headerHeight;
      rowNum = rowNum > rowsData.value.length ? rowsData.value.length : rowNum;
      agvHeight = unusedHeight / rowNum;
      rowHeight.value = new Array(rowNum).fill(agvHeight);
      rowStyle.value = _rowStyle;
      rowBg.value = config?.rowBg;
    }
    const startAnimation = async () => {
      // if(!isAnimationStart) return;
      const config = actualConfig.value;
      const { data, rowNum, moveNum, duration } = config;
      const totalLength = rowsData.value.length;
      const index = currentIndex.value;
      if(totalLength < rowNum) return;
      // 将数据重新头尾相连
      const _rowData = cloneDeep(rowsData.value);
      const rows = _rowData.slice(index);
      rows.push(..._rowData.slice(0, index));
      currentRowData.value = rows;
      // 先将所有行的高度还原
      rowHeight.value = new Array(totalLength).fill(agvHeight);
      // 将moveNum的行高设置为0
      // if(!isAnimationStart) return;
      const waitTime = 300;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      rowHeight.value.splice(0, moveNum, ...new Array(moveNum).fill(0));
      currentIndex.value += moveNum;
      // 是否达到最后一组数据
      const isLast = currentIndex.value - totalLength;
      if(isLast >= 0) {
        currentIndex.value = isLast;
      }
      // 延迟操作
      // if(!isAnimationStart) return;
      await new Promise(resolve => setTimeout(resolve, duration - waitTime));
      await startAnimation();
    }
    const stopAnimation = () => {
      isAnimationStart.value = false;
    }
    const update = () => {
      stopAnimation();
      const _actualConfig = assign(defaultConfig, ctx?.config);
      handleHeader(_actualConfig);
      handleRows(_actualConfig);
      actualConfig.value = _actualConfig;
      // 展示动画
      isAnimationStart.value = true;
      startAnimation();
    }
    onMounted(() => {
      // update();
    });
    watch(() => ctx.config, () => {
      update();
    });
    return {
      id,
      height,
      header,
      headerStyle,
      actualConfig,
      columnWidth,
      rowsData,
      rowHeight,
      rowStyle,
      rowBg,
      aligns,
      currentRowData,
      currentIndex,
    }
  }
}
</script>

<style lang="scss" scoped>
.base-scroll-list {
  height: 100%;
  width: 100%;
  .base-scroll-list-header {
    display: flex;
    align-items: center;
    .base-scroll-list-header-text {
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .base-scroll-list-rows-wrapper {
    overflow: hidden;
    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;
      .base-scroll-list-rows-item {
        height: 100%;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>