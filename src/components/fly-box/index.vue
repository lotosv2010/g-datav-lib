<template>
  <div class="g-fly-box" :ref="refName">
    <svg class="svg" :width="width" :height="height">
      <defs>
        <path
          :id="pathId"
          :d="path"
          fill="none"
        />
        <radialGradient
          :id="radialGradientId"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
          r="50%"
        >
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="maskId">
          <circle
            :r="starLength"
            cx="0"
            cy="0"
            :fill="`url(#${radialGradientId})`"
          >
            <animateMotion
              :dur="`${duration}s`"
              :path="path"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <use 
        :href="`#${pathId}`"
        stroke-width="1"
        :stroke="lineColor"
      ></use>
      <use 
        :href="`#${pathId}`"
        stroke-width="2"
        :stroke="starColor"
        :mask="`url(#${maskId})`"
      ></use>
    </svg>
    <div class="g-fly-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'GFlyBox',
  props: {
    lineColor: {
      type: String,
      default: '#235fa7'
    },
    starColor: {
      type: String,
      default: '#4fd2dd'
    },
    starLength: {
      type: [Number, String],
      default: 50
    },
    duration: {
      type: [Number, String],
      default: 3
    }
  },
  setup() {
    const width = ref(0);
    const height = ref(0);
    const refName = 'gFlyBox';
    const path = computed(() => {
      const w = width.value;
      const h = height.value;
      return `M 5 5 L ${w - 5} 5 L ${w - 5} ${h - 5} L 5 ${h - 5} Z`;
    });
    const init = () => {
      const instance = getCurrentInstance();
      const dom = instance?.ctx?.$refs[refName];
      width.value = dom.clientWidth;
      height.value = dom.clientHeight;
    }
    onMounted(() => {
      init();
    });
    const uuid = uuidv4();
    const pathId = `${refName}-path-${uuid}`;
    const radialGradientId = `${refName}-radialGradient-${uuid}`;
    const maskId = `${refName}-mask-${uuid}`;
    return {
      width,
      height,
      path,
      refName,
      pathId,
      radialGradientId,
      maskId
    };
  },
};
</script>

<style lang="scss" scoped>
.g-fly-box {
  position: relative;
  width: 100%;
  height: 100%;
  .svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .g-fly-box-content {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
