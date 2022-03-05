<template>
  <div class="g-container" :ref="refName">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue';
import debounce from 'lodash/debounce';

export default {
  name: 'GContainer',
  props: {
    options: {
      type: Object
    }
  },
  setup(ctx) {
    const refName = 'g-container';
    let context, dom, observer;
    // dom 宽高
    const width = ref(0);
    const height = ref(0);
    // 画布宽高
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);
    // 初始化
    const initSize = () => {
      return new Promise((resolve) => {
        nextTick(() => { // 保证一下逻辑是在渲染完成后执行
          dom = context?.$refs[refName];
          const { clientWidth, clientHeight } = dom;
          const { options = {} } = ctx;
          const { width: w, height: h} = options;
          width.value = w ?? clientWidth;
          height.value = h ?? clientHeight;
          if(!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          resolve();
        });
      });
    };
    // 更新 dom 宽高
    const updateSize = () => {
      if(width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalWidth}px`;
        dom.style.height = `${originalHeight}px`;
      }
    };
    // 计算宽高比
    const updateScale = () => {
      // 当前视口的实际显示区域
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      // 最终 dom 的大小
      const realWidth = width.value ?? originalWidth;
      const realHeight = height.value ?? originalHeight;
      // 计算缩放比
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;
      dom.style.transform = `scale(${widthScale}, ${heightScale})`;
    };
    const onResize = async (e) => {
      // console.log(e)
      await initSize();
      updateScale();
    };
    const initMutationObserver = () => {
      const MutationObserver = window.MutationObserver;
      observer = new MutationObserver(onResize);
      observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
      });
    };
    const removeMutationObserver = () => {
      if(observer) {
        observer.disconnect();
        observer.takeRecords();
        observer = null;
      }
    }
    onMounted(async () => {
      ready.value = false;
      context = getCurrentInstance()?.ctx;
      await initSize();
      updateSize();
      updateScale();
      window.addEventListener('resize', debounce(onResize, 100));
      initMutationObserver();
      ready.value = true;
    });
    onUnmounted(() => {
      window.removeEventListener('resize', onResize);
      removeMutationObserver();
    })
    return {
      refName,
      ready
    };
  },
};
</script>

<style lang="scss" scoped>
.g-container{
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: left top;
}
</style>
